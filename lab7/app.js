const app = require('express')();
var express = require('express');   
const http = require('http').Server(app);
const io = require('socket.io')(http);
const chat = io.of("/chat");
const usersToSocket = {};
const redisConnection = require("./redis-connection");
const nrpSender = require("./nrp-sender-shim");

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap
app.use('/public/js', express.static(__dirname + '/public/js'));

chat.on('connection', (socket) => {
  
  socket.on('join-room', (data) => {
    socket.leave(data.previousRoom);
    socket.join(data.newRoom);

    socket.emit("joined-room", data.newRoom);
  });

  socket.on('direct message', (msg) => {
    usersToSocket[msg.userName].emit('private message', {
      from: msg.fromUserName,
      text: msg.text
    });
  });

  socket.on('setup', (connectionInfo) => {
    usersToSocket[connectionInfo.nickname] = socket;
  });

  socket.on('send-message',async (msg) => {
    //send a message task to mq
    var response;
    try {
            response = await nrpSender.sendMessage({
            redis: redisConnection,
            eventName: "search-pic",
            data: {
                name: msg.name,
                key: msg.key,
                message: msg.message
            }
        });

        //console.log(response);
    } catch (e) {
      //console.log(e);
      response = {};
    }
    
       chat.to(msg.room).emit('receive-message', response);
  });

  socket.emit('request-credentials');
});

http.listen(3000, () => {
  console.log('listening on http://localhost:3000');
});

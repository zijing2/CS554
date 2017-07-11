const redisConnection = require("./redis-connection");
var request = require('sync-request');
const queryString = require('query-string');

redisConnection.on('search-pic:request:*',async (message, channel) => {
    let requestId = message.requestId;
    let eventName = message.eventName;

    let nameText = message.data.name;
    let keyText = message.data.key;
    let messageText = message.data.message;
    let successEvent = `${eventName}:success:${requestId}`;

    var query = queryString.stringify(
        {
            key:'4786227-2d6ee5fa3dc1f32085a02608a',
            q:keyText,
            image_type:'photo'
        }
    );
    //var res = request('GET', 'https://pixabay.com/api/?key=4786227-2d6ee5fa3dc1f32085a02608a&q=yellow+flowers&image_type=photo');
    var res = request('GET', 'https://pixabay.com/api/?'+query);
    var result = JSON.parse(res.getBody('utf8'));
    

    var data = {
        name : nameText,
        message : messageText,
        img : result
    }
   
    redisConnection.emit(successEvent, {
        requestId: requestId,
        data:data,
        eventName: eventName
    });
});
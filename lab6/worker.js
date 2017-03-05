const redisConnection = require("./redis-connection");
const data = require("./data");
const db = data.db;

// redisConnection.on('send-message:request:*', (message, channel) => {
//     let messageText = message.data.message;
//     console.log("\n\n\n=================")
//     console.log("We've received a message from the API server! It's:");
//     console.log(messageText);
//     console.log(JSON.stringify(message));
//     console.log("=================\n\n\n")
// });

// redisConnection.on('send-message-with-reply:request:*', (message, channel) => {
//     let requestId = message.requestId;
//     let eventName = message.eventName;

//     let messageText = message.data.message;
//     let successEvent = `${eventName}:success:${requestId}`;

//     redisConnection.emit(successEvent, {
//         requestId: requestId,
//         data: {
//             message: messageText,
//             reversedMessage: messageText.split('').reverse().join('')
//         },
//         eventName: eventName
//     });
// });

redisConnection.on('get-people-by-id:request:*',async (message, channel) => {
    let requestId = message.requestId;
    let eventName = message.eventName;
    var person;

    let messageText = message.data.message;
    let successEvent = `${eventName}:success:${requestId}`;
    try {
        person = await db.getById(messageText);
    } catch (error) {
        person = {};
    }

    redisConnection.emit(successEvent, {
        requestId: requestId,
        data:person,
        eventName: eventName
    });
});

redisConnection.on('create-people:request:*',async (message, channel) => {
    let requestId = message.requestId;
    let eventName = message.eventName;
    var person;

    let messageText = message.data.message;
    let successEvent = `${eventName}:success:${requestId}`;
    try {
        person = await db.createPeople(messageText.first_name,messageText.last_name,messageText.email,messageText.gender,messageText.ip_address);
    } catch (error) {
        person = {};
    }

    redisConnection.emit(successEvent, {
        requestId: requestId,
        data:person,
        eventName: eventName
    });
});

redisConnection.on('delete-people:request:*',async (message, channel) => {
    let requestId = message.requestId;
    let eventName = message.eventName;
    var status;

    let messageText = message.data.message;
    let successEvent = `${eventName}:success:${requestId}`;
    try {
        person = await db.getById(messageText);
        status = await db.deletePeople(messageText);
    } catch (error) {
        status = error;
    }
    

    redisConnection.emit(successEvent, {
        requestId: requestId,
        data: {
            status: status
        },
        eventName: eventName
    });
});

redisConnection.on('update-people:request:*',async (message, channel) => {
    let requestId = message.requestId;
    let eventName = message.eventName;

    var person; 
    let messageText = message.data.message;
    let successEvent = `${eventName}:success:${requestId}`;
    try {
         person = await db.updatePeople(messageText.id,messageText.first_name,messageText.last_name,messageText.email,messageText.gender,messageText.ip_address);
    } catch (error) {
        person = {error:error};
    }
   
    redisConnection.emit(successEvent, {
        requestId: requestId,
        data:person,
        eventName: eventName
    });
});
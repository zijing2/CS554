const dbConnection = require("../config/mongoConnection");
const data = require("../data/");
const tasks = data.tasks;
const comments = data.comments;

dbConnection().then(db => {
    return db.dropDatabase().then(() => {
        return dbConnection;
    }).then((db) => {
        for (var i = 0; i < 200; i++) {
            var k = tasks.addTask("Make lab", "Make the first lab for CS-554. Maybe talk about dinosaurs in it, or something",i,false);
        }
        return k;
    }).then(() => {
        console.log("Done seeding database");
        db.close();
    });
    
}, (error) => {
    console.error(error,123123);
});
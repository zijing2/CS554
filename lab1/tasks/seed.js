const dbConnection = require("../config/mongoConnection");
const data = require("../data/");
const tasks = data.tasks;
const comments = data.comments;

dbConnection().then(db => {
    return db.dropDatabase().then(() => {
        return dbConnection;
    }).then((db) => {
        return tasks.addTask("Make lab", "Make the first lab for CS-554. Maybe talk about dinosaurs in it, or something",1,false);
    }).then(() => {
        console.log("Done seeding database");
        db.close();
    });
    
}, (error) => {
    console.error(error);
});
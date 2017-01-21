const mongoCollections = require("../config/mongoCollections");
const tasks = mongoCollections.tasks;
const uuid = require('node-uuid');

let exportedMethods = {

    getAllTasks() {
        return tasks().then((tasksCollection) => {
            return tasksCollection
                .find({})
                .toArray();
        }); 
    },

    getTaskById(id){
        return tasks().then((tasksCollection) => {
            return tasksCollection
                .findOne({_id: id})
                .then((task) => {
                    if (!task) 
                        throw "task not found";
                    return task;
                });
        }); 
    },

    addTask(title,description,hoursEstimated,completed) {
         
        if(title == undefined){
            return Promise.reject("title is needed");
        }else if (typeof title !== "string") {
            return Promise.reject("title must be a string");
        }  
        if(description  == undefined){
            return Promise.reject("description is needed");
        }else if (typeof description !== "string") {
            return Promise.reject("description must be a string");
        }  
        hoursEstimated = parseInt(hoursEstimated);
        if(hoursEstimated  == undefined){
            return Promise.reject("hoursEstimated is needed");
        }else if (typeof hoursEstimated !== "number") {
            return Promise.reject("hoursEstimated must be a number");
        }
        if(completed === 'true'){
            completed = true;
        }else if(completed === 'false'){
            completed = false;
        }
        if(completed == undefined){
            return Promise.reject("completed is needed");
        }else if (typeof completed !== "boolean") {
            return Promise.reject("completed must be a boolean");
        }          
        
        comments = [];
       
        return tasks().then((tasksCollection) => {
            let newTask = {
                _id: uuid.v4(),
                title: title,
                description: description,
                hoursEstimated: hoursEstimated,
                completed: completed,
                comments: comments
            };

            return tasksCollection
                .insertOne(newTask)
                .then((newInsertInformation) => {
                    return newInsertInformation.insertedId;
                })
                .then((newId) => {
                    return this.getTaskById(newId);
                });  
        });
    },

    updateTask(id,title,description,hoursEstimated,completed) {
        return tasks().then((tasksCollection) => {
            let updatedTaskData = {};

            if(title == undefined){
                    return Promise.reject("title is needed");
                }else if (typeof title !== "string") {
                    return Promise.reject("title must be a string");
                }  
                if(description  == undefined){
                    return Promise.reject("description is needed");
                }else if (typeof description !== "string") {
                    return Promise.reject("description must be a string");
                }  
                if(hoursEstimated  == undefined){
                    return Promise.reject("hoursEstimated is needed");
                }else if (typeof hoursEstimated !== "number") {
                    return Promise.reject("hoursEstimated must be a number");
                }
                if(completed == undefined){
                    return Promise.reject("completed is needed");
                }else if (typeof completed !== "boolean") {
                    return Promise.reject("completed must be a boolean");
                }       

            updatedTaskData = {
                "title" : title,
                "description" : description,
                "hoursEstimated" : hoursEstimated,
                "completed" : completed,
            }
            let updateCommand = {
                $set: updatedTaskData
            };

            return tasksCollection.updateOne({
                _id: id
            }, updateCommand).then((result) => {
                return this.getTaskById(id);
            });
        });
    },  

    patchTask(id, updatedTaskData) {
        return tasks().then((tasksCollection) => {

            if(updatedTaskData.title != undefined){
                if (typeof updatedTaskData.title !== "string") {
                    return Promise.reject("title must be a string");
                }    
            } 
            if(updatedTaskData.description  != undefined){
                if (typeof updatedTaskData.description !== "string") {
                    return Promise.reject("description must be a string");
                }  
            }
            if(updatedTaskData.hoursEstimated  != undefined){
                if (typeof updatedTaskData.hoursEstimated !== "number") {
                    return Promise.reject("hoursEstimated must be a number");
                }
            }
                
            if(updatedTaskData.completed != undefined){
                if (typeof updatedTaskData.completed !== "boolean") {
                    return Promise.reject("completed must be a boolean");
                }
            }  

            let updateCommand = {
                $set: updatedTaskData
            };

            return tasksCollection.updateOne({
                _id: id
            }, updateCommand).then((result) => {
                return this.getTaskById(id);
            });
        });
    }

    
}

module.exports = exportedMethods;
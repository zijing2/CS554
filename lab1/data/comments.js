
const mongoCollections = require("../config/mongoCollections");
const uuid = require('node-uuid');
const tasksModule = require("./tasks");
const tasks = mongoCollections.tasks;


let exportedMethods = {

    getAllCommentsByReceptId(Rid) {
       return tasksModule.getTaskById(Rid).then((task)=>{
           let comments = task.comments;
           let commentsFormat = [];

            for (var index = 0; index < task.comments.length; index++) {
                let commentTmp = {
                    _id: comments[index]._id, 
                    taskId: task._id, 
                    reciipeTitle: task.title,
                    name: comments[index].comment, 
                    poster: comments[index].poster
                };
                commentsFormat.push(commentTmp);
                
            }
            return commentsFormat;
       });
    },

    getCommentById(id){
        return tasks().then((tasksCollection) => {            
            return tasksCollection
                .findOne({"comments": { $elemMatch: { "_id": id } }})
                .then((task) => {
                    if (!task){
                        throw "comment not found";
                    } 
                    for (var index = 0; index < task.comments.length; index++) {
                        if(task.comments[index]._id == id){
                            var comment = task.comments[index];
                        }
                    }
                    let commentFormat = {
                        _id: comment._id, 
                        taskId: task._id, 
                        name: comment.name, 
                        comment: comment.comment
                    }

                    return commentFormat;
                });
        }); 
    },

    addComment(Tid,name,comment) {
        return tasks().then((tasksCollection)=>{
            if(name === undefined){
                return Promise.reject("name is needed");
            }
            if (typeof name !== "string") {
                return Promise.reject("name must be string");
            } 
            if(comment === undefined){
                return Promise.reject("comment is needed");
            }
            if (typeof comment !== "string") {
                return Promise.reject("comment must be string");
            }   
            
            var cid = uuid.v4();
            let newComment = {
                _id: cid,
                name: name,
                comment: comment
            };

            return tasksCollection
                .update({ _id: Tid }, { $push: { "comments": newComment } }).then((result) => {
                 return this.getCommentById(cid).then((rtn)=>{
                    return rtn;
                });        
            });
        });
    },

    updateComment(comment, updatedComment) {
        return tasks().then((tasksCollection) => {
            let updatedCommentData = {};

            updatedComment._id = comment._id;

            if (updatedComment.poster) {
                updatedCommentData.poster = updatedComment.poster;
            }

            if (updatedComment.comment) {
                updatedCommentData.comment = updatedComment.comment;
            }

            var commentParam = {
                "_id": comment._id,
                "comment": comment.name,
                "poster": comment.poster, 
            };

            return tasksCollection
                .update({ _id: comment.taskId }, { $pull: { "comments": commentParam } })
                .then((result) => {  
                   return tasksCollection.update({ _id: comment.taskId }, { $push: { "comments": updatedComment } })
                   .then(()=>{});
                }).catch(()=>{
                    throw(`Could not delete comment with id of ${comment._id}`)
                });
        });
    },  

    removeComment(taskId,comment) {
        return tasks().then((tasksCollection) => {
            var commentParam = {
                "_id": comment._id,
                "name": comment.name, 
                "comment": comment.comment 
            };
            return tasksCollection
                .update({ _id: taskId }, { $pull: { "comments": commentParam } })
                .then((result) => {  
                   return result;
                }).catch(()=>{
                    throw(`Could not delete comment with id of ${comment._id}`)
                });
        });
    }
}

module.exports = exportedMethods;
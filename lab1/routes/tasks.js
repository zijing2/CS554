const express = require("express");
const router = express.Router();

const data = require("../data");
const tasksData = data.tasks;
const commentsData = data.comments;

router.get("/", (req, res) => {
    tasksData.getAllTasks().then((tasksList) => {
        res.status(200).json(tasksList);
    }).catch((e) => {
        res.status(500).json({ error: e });
    });
});

router.get("/:id", (req, res) => {
    tasksData.getTaskById(req.params.id).then((task) => {
        res.json(task);
    }).catch(() => {
        res.status(404).json({ error: "task not found" });
    });
});

router.post("/", (req, res) => {
    let taskPostData = req.body;

    tasksData.addTask(taskPostData.title,  taskPostData.description, taskPostData.hoursEstimated, taskPostData.completed )
        .then((newTasks) => {
            res.json(newTasks);
        }).catch((e) => {
            res.status(500).json({ error: e });
        });
});

router.put("/:id", (req, res) => {
    let taskPostData = req.body;

    let getTasks = tasksData.getTaskById(req.params.id);

    getTasks.then(() => {
        return tasksData.updateTask(req.params.id, taskPostData.title, taskPostData.description, taskPostData.hoursEstimated, taskPostData.completed)
            .then((updatedTasks) => {
                res.json(updatedTasks);
            }).catch((e) => {
                res.status(500).json({ error: e });
            });
    }).catch((e) => {
        res.status(404).json({ error: e });
    });

});

router.patch("/:id", (req, res) => {
    let taskPostData = req.body;
    let getTasks = tasksData.getTaskById(req.params.id);

    getTasks.then(() => {
        return tasksData.patchTask(req.params.id, taskPostData)
            .then((updatedTasks) => {
                res.json(updatedTasks);
            }).catch((e) => {
                res.status(500).json({ error: e });
            });
    }).catch((e) => {
        res.status(404).json({ error: e });
    });

});

router.post("/:id/comments", (req, res) => {
    let commentPostData = req.body;

    commentsData.addComment(req.params.id, commentPostData.name, commentPostData.comment)
        .then((newComment) => {
            res.json(newComment);
        }).catch((e) => {
            res.status(500).json({ error: e });
        });
});

router.delete("/:taskId/:commentId", (req, res) => {
    let getComment = commentsData.getCommentById(req.params.commentId);

    getComment.then((comment) => {
        return commentsData.removeComment(req.params.taskId,comment)
            .then(() => {
                res.status(200).json({"result":"ok"});
            }).catch((e) => {
                res.status(500).json({ error: e });
            });
    }).catch(() => {
        res.status(404).json({ error: "comment not found" });
    });
});


module.exports = router;
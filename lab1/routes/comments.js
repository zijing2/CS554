const express = require("express");
const router = express.Router();

const data = require("../data");
const commentsData = data.comments;

router.get("/task/:taskId", (req, res) => {
        commentsData.getAllCommentsByReceptId(req.params.taskId).then((commentsList) => {
        res.status(200).json(commentsList);
    }).catch((e) => {
        res.status(500).json({ error: e });
    });
});

router.get("/:commentId", (req, res) => {
    commentsData.getCommentById(req.params.commentId).then((comment) => {
        res.status(200).json(comment);
    }).catch(() => {
        res.status(404).json({ error: "comment not found" });
    });
});

router.post("/:taskId/", (req, res) => {
    let commentPostData = req.body;

    commentsData.addComment(req.params.taskId, commentPostData.comment, commentPostData.poster)
        .then((newComment) => {
            res.json(newComment);
        }).catch((e) => {
            res.status(500).json({ error: e });
        });
});

router.put("/:taskId/:commentId", (req, res) => {    
    let updatedData = req.body;
    let getComment = commentsData.getCommentById(req.params.commentId);

    getComment.then((comment) => {
        return commentsData.updateComment(comment, updatedData)
            .then((updatedRecipe) => {
                res.sendStatus(200).json(updatedData);
            }).catch((e) => {
                res.status(500).json({ error: e });
            });
    }).catch(() => {
        res.status(404).json({ error: "Comment not found" });
    });

});

router.delete("/:id", (req, res) => {
    let getComment = commentsData.getCommentById(req.params.id);

    getComment.then((comment) => {
        return commentsData.removeComment(comment)
            .then(() => {
                res.sendStatus(200);
            }).catch((e) => {
                res.status(500).json({ error: e });
            });
    }).catch(() => {
        res.status(404).json({ error: "comment not found" });
    });
});




module.exports = router;
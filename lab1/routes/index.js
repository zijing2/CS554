const tasksRoutes = require("./tasks");
const commentsRoutes = require("./comments");

const constructorMethod = (app) => {

    app.use("/api/tasks", tasksRoutes);
    app.use("*", (req, res) => {
        res.sendStatus(404);
    });
};

module.exports = constructorMethod;
const apiRoutes = require("./api");

const constructorMethod = (app) => {
    app.use("/", apiRoutes);

};

module.exports = constructorMethod;
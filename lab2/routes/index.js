const constructorMethod = (app) => {

    app.use("／", (req, res) => {
        res.render("index");
    });
};

module.exports = constructorMethod;
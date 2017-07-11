const recipeRoutes = require("./recipes");

const constructorMethod = (app) => {
    app.use("/recipes", recipeRoutes);
    app.get("/", (req, res) => {
        res.render("home", {pageTitle:"Lab4"});
    });
    
    app.use("*", (req, res) => {
        res.redirect("/");
    })
};

module.exports = constructorMethod;
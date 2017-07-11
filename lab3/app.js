const express = require("express");
const app = express();
const static = express.static(__dirname + '/public');

const exphbs = require('express-handlebars');

const Handlebars = require('handlebars');

const handlebarsInstance = exphbs.create({
    //defaultLayout: 'main'
});

app.engine('handlebars', handlebarsInstance.engine);
app.set('view engine', 'handlebars');

app.use("/public", static);

app.use('//', function(req, res){ res.render("index"); });

app.use("*", (req, res) => {
    res.sendStatus(404);
})




app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
});
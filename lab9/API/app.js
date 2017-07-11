const express = require("express");
let app = express();
let configRoutes = require("./routes");

app.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Headers', req.get('Access-Control-Request-Headers'));
    next();
});

configRoutes(app);


app.listen(3001, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3001");
});
const express = require("express");
let app = express();
let configRoutes = require("./routes");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

//First Middleware
app.use('*', function (req, res, next) {
    console.log("req body: ");
    console.log(req.body);
    console.log("req route: "+req.baseUrl);
    console.log("http verb: "+req.method);
    next();    
});

var req_times = {};
//Second Middleware
app.use('*', function (req, res, next) {
    let req_base_url = req.baseUrl;
    if(req_times[req_base_url] == undefined){
        req_times[req_base_url] = 0;
    }else{
        req_times[req_base_url]++;
    }
    console.log("req times:");
    console.log(req_times);
    console.log("\n");
    next();    
});


configRoutes(app);

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
});
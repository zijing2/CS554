const express = require('express');
const router = express.Router();
const data = require("../data");
const db = data.db;

const bluebird = require("bluebird");
const flat = require("flat");
const unflatten = flat.unflatten
//const redis = require('redis');
//const client = redis.createClient();

//bluebird.promisifyAll(redis.RedisClient.prototype);
//bluebird.promisifyAll(redis.Multi.prototype);

router.get("/api/people/history",async (req, res) => {
         var len;
         var people_arr = [];
        if(await client.llenAsync('list')<19){
            len = await client.llenAsync('list');
            //client.llen
        }else{
            len = 19;
        }
        people_arr = await client.lrangeAsync('list',0,len);
        for(var i=0;i<people_arr.length;i++){
            people_arr[i] = JSON.parse(people_arr[i]);
        }
        res.status(200).json(people_arr);
});

router.get("/api/people/:id",async (req, res) => {
        //check redis data
        //  let doesIdExist = await client.existsAsync(req.params.id);
        //  if(doesIdExist){
        //     let people = await client.getAsync(req.params.id);
        //     await client.lpush('list',people);
        //     res.status(200).json(JSON.parse(people));
        //  }else{
        //      try {
        //          var people = await db.getById(req.params.id);
        //          let setResult = await client.setAsync(req.params.id, JSON.stringify(people));
        //          await client.lpush('list',JSON.stringify(people));
        //          res.status(200).json(people);
        //      } catch (error) {
        //          res.status(404).json({error: "person not found"});
        //      }
        //  }  

        try {
            var people = await db.getById(req.params.id);
            res.status(200).json(people);
        } catch (error) {
            res.status(404).json({error: "person not found"});
        }
});

router.get("/api/:page/people",async (req, res) => {
    try {
        var peopleList = await db.getByPage(25, req.params.page);
        res.status(200).json(peopleList);
    } catch (error) {
        res.status(404).json({error: "page not found"});
    }
});



module.exports = router;
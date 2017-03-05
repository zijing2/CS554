const express = require("express");
const app = express();
const redisConnection = require("../redis-connection");
const nrpSender = require("../nrp-sender-shim");
const router = express.Router();


router.get("/api/people/:id",async (req, res) => {
    try {
        let response = await nrpSender.sendMessage({
            redis: redisConnection,
            eventName: "get-people-by-id",
            data: {
                message: req.params.id
            }
        });
        res.json(response);
    } catch (e) {
        res.json({ error: e.message });
    }
});

router.post("/api/people",async (req, res) => {
    try {
        if(req.body.first_name==""||typeof req.body.first_name!="string"){
            throw "first_name invalid";
        }
        if(req.body.last_name==""||typeof req.body.last_name!="string"){
            throw "last_name invalid";
        }
        if(req.body.email==""||typeof req.body.email!="string"){
            throw "email invalid";
        }
        if(req.body.gender==""||typeof req.body.gender!="string"){
            throw "email invalid";
        }
        if(req.body.ip_address==""||typeof req.body.ip_address!="string"){
            throw "ip_address invalid";
        }
        
        let response = await nrpSender.sendMessage({
            redis: redisConnection,
            eventName: "create-people",
            data: {
                message: req.body
            }
        });
        res.json(response);
    } catch (e) {
        res.json({ error: e });
    }
});

router.delete("/api/people/:id",async (req, res) => {
    try {
        let response = await nrpSender.sendMessage({
            redis: redisConnection,
            eventName: "delete-people",
            data: {
                message: req.params.id
            }
        });
        res.json(response);
    } catch (e) {
        res.json({ error: e });
    }
});

router.put("/api/people/:id",async (req, res) => {
    try {
        req.body.id = req.params.id;

        if(req.body.first_name==""||typeof req.body.first_name!="string"){
            throw "first_name invalid";
        }
        if(req.body.last_name==""||typeof req.body.last_name!="string"){
            throw "last_name invalid";
        }
        if(req.body.email==""||typeof req.body.email!="string"){
            throw "email invalid";
        }
        if(req.body.gender==""||typeof req.body.gender!="string"){
            throw "email invalid";
        }
        if(req.body.ip_address==""||typeof req.body.ip_address!="string"){
            throw "ip_address invalid";
        }
        if(req.body.id==""||typeof req.body.id!="string"){
            throw "id invalid";
        }
        
        let response = await nrpSender.sendMessage({
            redis: redisConnection,
            eventName: "update-people",
            data: {
                message: req.body
            }
        });
        res.json(response);
    } catch (e) {
        res.json({ error: e });
    }
});



module.exports = router;
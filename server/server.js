const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require("cors");
const path = require("path")
const jwt = require("jsonwebtoken");
const { findUserInDB, findUserById } = require("./helpers");

const getKey = async () => {
    try {
        const key = fs.readFileSync(path.resolve("./server/secret.key"), "utf8");
        return key;
    }catch(e) {
        throw new Error({name: "couldnt find secret"})
    }
    
}

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post("/verify-token", async (req, res, next) => {
    try {
        const key = await getKey();
        const token = jwt.verify(req.body.token, key);
        const user = findUserById(token);
           console.log(user)
        if (user) {
            return res.json({success: true, token});
        }

        return res.json({success:false})
    } catch(e) {
        console.log(e)
        if(e.name == "TokenExpiredError"){
            res.json({success: false}); 
        }
        if (e.name == "couldnt find secret") {
            res.json({success: false, error: "couldnt find secret"})
        }
    }
});

app.post("/login", (req, res, next) => {
    try {
        const user = findUserInDB(req.body)
        
        if (!user) {
            return res.send({success: false, error: "invalid user or username"})
        }
        
        const key = fs.readFileSync(path.resolve("./server/secret.key"));

        const token = jwt.sign({
            username: user.username,
            id: user.id,
        }, key, { expiresIn: '60000' });

        res.json({success: true, data: {username: user.username, token}});
        
} catch(e) {
        console.log(e);
    }
})

app.post("/createUser", async (req, res, next) => {
    try {
        console.log("GOT HERE")
        // read current json file
        const json = fs.readFileSync(path.resolve("./data/users.json"));
        //modify json
        const users = JSON.parse(json);
        // write to file
        const id = Math.random() + "";
        users[id] = {...req.body, id};

        const file = fs.writeFileSync("./data/users.json", JSON.stringify(users))

        return res.json({success: true});

    } catch(e) {
        console.log(" THIS WA S EN ERROR", e)
        if (e.code === "ENOENT") {            
            return res.json({success: false, error: "file not found"})
        }
    }
})

app.get("/user", () => {

});

app.listen(3001,(port) => console.log("listening on port "+3001));
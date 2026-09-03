const express = require("express");
const path = require("path");

const app = express();
app.use(express.static(path.join(__dirname, "../frontend/revolution-girl")));

const peeps = [
    {
        id:1,
        username:"meowers",
        password:"1234567890",
        pronouns:"she/her"
    }
]

const posts = [
    {
        id:1,
        image:"disjadiosajo",
        poster:"gunz"
    },
    {
        id:2,
        image:"aaaaajh",
        poster:"johnPersona"
    }
]

const port = process.env.PORT || 8080;
const appName = process.env.APP_NAME || "Revolution Girl";
const appEnv = process.env.APP_ENV || "development";

app.get("/", (req,res)=>{
    //basic functionality of logging in as existing user
    /*const {username, password} = req.body;
    const user = peeps.find((peep)=>peep.username==username&&peep.password==password);
    if(!user){
        return res.status(401).json({success: false, message:"Username or password incorrect"});
    }*/
    const user = peeps[0];
    res.status(202).json({
    success:true,
    user:{
            id: user.id,
            username: user.username,
            pronouns: user.pronouns
        }
    })
});

app.post("/signup", (req,res)=>{
    //basic function of adding new user
    const newUser = {
        id: 2,
        username: "newPersonSon",
        password: "321f",
        pronouns: "he/him"
    }
    peeps.push(newUser);
    res.status(201).json({
        success:true,
        user:{
            id: newUser.id,
            username: newUser.username,
            pronouns: newUser.pronouns
        }
    });
});

app.listen(port, ()=>{
    console.log(`${appName} is running on port ${port}`);
});
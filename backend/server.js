import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB, getDB } from "./db.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 8080;
const appName = process.env.APP_NAME || "Revolution Girl";
//const appEnv = process.env.APP_ENV || "development";

app.get("/api/users", async (req,res)=>{
    //basic functionality of logging in as existing user
    try{
        const db = getDB();
        const collection = db.collection("users");
        const users = await collection.find().toArray();
        res.status(200).json(users);
    }catch(err){
        res.status(500).json({message: "Error occured while retrieving database", error:err.message});
    }
});

app.get("/api/posts", async (req, res)=>{
    try{
        const db = getDB();
        const collection = db.collection("posts");
        const posts = await collection.find().toArray();
        res.status(200).json(posts);
    }catch(err){
        res.status(500).json({message: "Error occured while retrieving database", error: err.message});
    }
});

app.get("/api/albums", async (req, res)=>{
    try{
        const db = getDB();
        const collection = db.collection("albums");
        const albums = await collection.find().toArray();
        res.status(200).json(albums);
    }catch(err){
        res.status(500).json({message: "Error occured while retrieving database", error: err.message})
    }
});

app.post("/api/users", async (req,res)=>{
    //basic function of adding new user
    try{
        const {email, username, password, pronouns} = req.body;
        const emailPat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;//used to check if email is correctly constructed
        if(username.trim()==""||pronouns.trim()==""||(email.trim()==""||!emailPat.test(email))||password.trim()==""){
            return res.status(400).json({message:"Missing either username or pronouns. Cannot add..."});
        }else{
            const db = getDB();
            const collection = await db.collection("users");
            const addUser={
                admin: false,
                email,
                username,
                password,
                pronouns: [pronouns],
                friends: [],
                albums: []
            }
            const result = await collection.insertOne(addUser);
            console.log(result);
            res.status(200).json({_id: result.insertedId, ...addUser});
        }
    }catch(err){
        res.status(500).json({message: "Error occured trying to add user", error: err.message});
    }
});

app.post("/api/posts", async (req, res)=>{
    //basic function of adding new post
    try{
        const {poster, caption, hashtags} = req.body;
        if(caption.trim()==""){
            return res.status(400).json({message:"Caption is missing. Cannot to add post"});
        }else{
            const date = new Date();
            const db = getDB();
            const collection = await db.collection("posts");
            const addPost = {
                poster,
                caption,
                comments: [],
                likes: 0,
                hashtags: [...hashtags],
                date: date.toISOString,
                reports: 0
            }
            const result = await collection.insertOne(addPost);
            console.log(result);
            res.status(200).json({_id: result.insertedId, ...addPost});
        }
    }catch(err){
        res.status(500).json({message:"Error occured trying to add post", error: err.message});
    }
});

connectDB()
    .then(()=>{
        app.listen(port, ()=>{
            console.log(`${appName} is running on http://localhost:${port}`);
        });    
    })
    .catch((error)=>{
        console.error("Failed to connect to MongoDB: ",error);
    });
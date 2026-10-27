import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import multer, { diskStorage } from "multer";
import { connectDB, getDB } from "./db.js";
import {ObjectId} from "mongodb";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

const port = process.env.PORT || 8080;
const appName = process.env.APP_NAME || "Revolution Girl";
//const appEnv = process.env.APP_ENV || "development";

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "uploads/");
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
});

const uploadImage = multer({
    storage: storage
})

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

app.post("/login/users", async (req, res)=>{
    try{
        const {username, password} = req.body;
        const db = getDB();
        const collection = db.collection("users");
        const user = await collection.findOne({
            $and: [
                {username: {$eq: username}},
                {password: {$eq: password}}
            ]
        });
        if(user==null){
            return res.status(400).json({message: "Invalid credentials received. Cannot find user information"});
        }
        res.status(200).json(user);
    }catch(err){
        res.status(500).json({message: "Error occured whilst checking credentials", error: err.message});
    }
});

app.post("/api/getPost", async (req, res)=>{
    console.log("meow");
    try{
        const {postId} = req.body;
        const db = getDB();
        const collection = db.collection("posts");
        const post = await collection.findOne({_id: new ObjectId(postId)});
        console.log("Received post:\n",post);
        if(post==null){
            return res.status(400).json({message: "Invalid post id was received. Cannot find post"});
        }
        res.status(200).json(post);
    }catch(err){
        res.status(500).json({message:"Error occured whilst finding post", error: err.message});
    }
});

app.post("/api/users", async (req,res)=>{
    //basic function of adding new user
    try{
        const {email, username, password, pronouns} = req.body;
        const emailPat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;//used to check if email is correctly constructed
        if(username.trim()==""||pronouns.trim()==""||(email.trim()==""||!emailPat.test(email))||password.trim()==""){
            return res.status(400).json({message:"Missing one or more inputed data. Please ensure username, pronouns, password, email are correctly entered"});
        }else{
            const db = getDB();
            const collection = await db.collection("users");
            const addUser={
                admin: false,//always set to false admins are added by server mods/admins thus admin set in db
                email,//email of the person logging in
                username,
                password,
                pronouns: [pronouns],//array containing the pronouns of the person being added
                friends: [],//array containing the ids to usernames to easily display them
                albums: []//array containing albums for dif posts and dif names for albums
            }
            const result = await collection.insertOne(addUser);
            console.log(result);
            res.status(200).json({_id: result.insertedId, ...addUser});
        }
    }catch(err){
        res.status(500).json({message: "Error occured trying to add user", error: err.message});
    }
});

app.post("/api/posts", uploadImage.single("image"),async (req, res)=>{
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
                image: `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`,//path to iamges stored on server in /uploads folder under backend
                poster,//username of person
                caption,
                comments: [],//array containing comments and their comments
                likes: 0,
                hashtags: [...hashtags],//array containing hastags for post
                date: date.toISOString,//exact date and time of post
                reportCount: 0
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
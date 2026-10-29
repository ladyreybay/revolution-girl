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
        const uniqName = Date.now()+"-"+Math.random(Math.random()*1E9);
        const ext = file.originalname.substring(file.originalname.lastIndexOf("."));
        cb(null, uniqName+ext);
    }
});

const uploadImage = multer({
    storage: storage
})

app.get("/api/users", async (req,res)=>{//basic functionality of logging in as existing user
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

app.post("/login/users", async (req, res)=>{//used to verify if password and usernmae are correct/exist
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
        if(user===null){
            return res.status(400).json({message: "Invalid credentials received. Cannot find user information"});
        }
        res.status(200).json(user);
    }catch(err){
        res.status(500).json({message: "Error occured whilst checking credentials", error: err.message});
    }
});

app.post("/api/getPost", async (req, res)=>{//used to get one post for viewing post
    try{
        const {postId} = req.body;
        const db = getDB();
        const collection = db.collection("posts");
        const post = await collection.findOne({_id: new ObjectId(postId)});
        if(post===null){
            return res.status(400).json({message: "Invalid post id was received. Cannot find post"});
        }
        res.status(200).json(post);
    }catch(err){
        res.status(500).json({message:"Error occured whilst finding post", error: err.message});
    }
});

app.post("/api/getSpecPosts", async (req, res)=>{//used to get all the posts of one person
    try{
        const {userId} = req.body;
        const db = getDB();
        const collection = db.collection("posts");
        const posts = await collection.find({posterId: userId}).toArray();
        if(posts===null){
            return res.status(400).json({message:"Invalid userId was provided. Cannot find posts"});
        }
        res.status(200).json(posts);
    }catch(err){
        res.status(500).json({message:"Error occured whilst finding posts", error:err.message});
    }
});

app.post("/api/getAccount", async (req, res)=>{//used to get account information
    try{
        const {userId} = req.body;
        const db = getDB();
        const collection = db.collection("users");
        const user = await collection.findOne({_id: new ObjectId(userId)});
        if(user===null||user===undefined){
            return res.status(400).json({message:"Invalid profile id was received. Cannot find user"});
        }
        res.status(200).json(user);
    }catch(err){
        res.status(500).json({message:"Error occured whilst finding account", error:err.message});
    }
});

app.post("/api/user", async (req,res)=>{//basic function of adding new user
    try{
        const {email, username, password, confirmPas, pronouns} = req.body;
        const emailPat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;//used to check if email is correctly constructed
        if(username.trim()==""||(email.trim()==""||!emailPat.test(email))||password.trim()==""||confirmPas.trim()==""){
            return res.status(400).json({message:"Missing one or more inputed data. Please ensure username, pronouns, password, email are correctly entered"});
        }
        if(password!==confirmPas){
            return res.status(400).json({message:"Password and confirm password do not match. Please ensure they match exactly and try again"});
        }
        const db = getDB();
        const collection = db.collection("users");
        const checkUser = await collection.findOne({username: username});//check if username already exists
        if(checkUser!=null){//returns this if result was true/var not null
            return res.status(400).json({message:`Username ${username} is already taken. Please choose a different username and try again`});
        }
        const addUser={
            admin: false,//always set to false admins are added by server mods/admins thus admin set in db
            email,//email of the person logging in
            username,
            password,
            pronouns: [...pronouns],//array containing the pronouns of the person being added
            friends: [],//array containing the ids to usernames to easily display them
            albums: []//array containing albums for dif posts and dif names for albums
        }
        const result = await collection.insertOne(addUser);
        if(result==null||result==undefined){//check if something funky happened
            res.status(500).json({message:"Unable to add user. Please try again later", error:"Unknown error occured"})
        }
        res.status(200).json({_id: result.insertedId, ...addUser});
    }catch(err){
        res.status(500).json({message: "Error occured trying to add user", error: err.message});
    }
});

app.post("/api/posts", uploadImage.single("image"),async (req, res)=>{//basic function of adding new post
    try{
        const caption = req.body.caption;
        const hashtags = JSON.parse(req.body.hashtags||[]);
        if(caption.trim()==""){
            return res.status(400).json({message:"Caption is missing. Cannot to add post"});
        }else{
            const date = new Date();
            const addPost = {
                image: `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`,//path to iamges stored on server in /uploads folder under backend
                poster: req.body.poster,//username of person
                posterId: req.body.posterId,
                caption: caption.trim(),
                comments: [],//array containing comments and their comments
                likes: 0,
                hashtags: hashtags,//array containing hastags for post
                date: date.toISOString(),//exact date and time of post
                reportCount: 0
            }
            const db = getDB();
            const collection = db.collection("posts");
            const result = await collection.insertOne(addPost);
            if(result==null||result==undefined){//check if something funky happened
                return res.status(500).json({message:"Something went wrong with adding post. Please try again later", error:"Unknown error occured"});
            }
            res.status(200).json({_id: result.insertedId, ...addPost});
        }
    }catch(err){
        res.status(500).json({message:"Error occured trying to add post", error: err.message});
    }
});

app.put("/api/comment", (req, res)=>{//adds comment
    try{
        const {postId, username, comment} = req.body;
        if(comment.trim()==""){
            return res.status(400).json({message:"Your comment cannot be empty. Please add something and try again"});
        }
        const db = getDB();
        const collection = db.collection("posts");
        const addComment = {

        }
    }catch(err){
        res.status(500).json({message:"Error occured while adding your comment. Please try again later", error:err.message});
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
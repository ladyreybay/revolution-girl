import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

let client;
let db;

async function connectDB(){
    const uri = process.env.MONGO_URI;
    client = new MongoClient(uri);
    await client.connect();
    db = client.db("revolutionGirl");
    console.log("Connected to MongoDB, revolutionGirl");
}

function getDB(){
    return db;
}

export {connectDB, getDB};
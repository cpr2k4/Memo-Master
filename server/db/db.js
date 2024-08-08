import mongoose, { mongo } from "mongoose";

export const dbConnect = async()=>{
    const URL = "mongodb://127.0.0.1:27017/NotesApp";
    try{
        mongoose.connect(URL);
        console.log("Connected to db...");
    }
    catch(err){
        console.log("Error while connecting to db...",err.message);
        // mongoose.close();
    }
}
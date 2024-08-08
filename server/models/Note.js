import mongoose from "mongoose";
import { Schema } from "mongoose";

const notesSchema = Schema({
    title:{
        type:String,
        required: true,
        min:1   //atleast 1 char 
    },
    noteData:{
        type:String,
        required:true
    },

},{timestamps:true});

const Note = mongoose.model("Note",notesSchema);

export default Note;
import Note from "../models/Note.js";

export const saveNoteToDb = async(req,res)=>{
    try{
        const note = req.body;
        // console.log(note);
        const newNote = new Note(note);
        await newNote.save();
        res.status(200).json({success:"Note saved in db..."});
    }
    catch(err){
        console.log("Error while saving note in db in notes-controller...",err.message);
        res.status(500).json({failure:"Note failed to be saved in db in notes-controller..."});
    }
}

export const getNotes = async(req,res)=>{
    try{
        const notes = await Note.find({});  
        res.status(200).json(notes);
    }
    catch(err){
        console.log("Error while getting notes from db in notes-controller...",err.message);
        res.status(500).json({failure:"Unable to get all notes from db in notes-controller..."});
    }
}

export const getSingleNote = async(req,res)=>{
    try{
        const id = req.params;
        const note = await Note.findById(id);
        res.status(200).json(note);
    }
    catch(err){
        console.log("Error while getting single note from db in notes-controller...",err.message);
        res.status(500).json({failure:"Unable to get note with id from db in notes-controller..."});
    }
}

export const saveUpdatedNote = async(req,res)=>{
    try{
        const {id} = req.params;
        const note = req.body;
        if(note && id){
            const updatedNote = await Note.findByIdAndUpdate(id,note,{new:true});
        }
        res.status(200).json({success:"Note updated..."});
    }
    catch(err){
        console.log("Error while updating single note in db in notes-controller...",err.message);
        res.status(500).json({failure:"Unable to update note with id from db in notes-controller..."});
    }
}


export const deleteNote = async(req,res)=>{
    try{
        const {id} = req.params;
        await Note.findByIdAndDelete(id);
        res.status(200).json({success:"Note deleted from db..."});
    }
    catch(err){
        console.log("Error while deleting note in db in notes-controller...",err.message);
        res.status(500).json({failure:"Note failed to be deleted from db in notes-controller..."});
    }
}


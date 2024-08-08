import { createSlice } from "@reduxjs/toolkit";

const noteSlice = createSlice({
    name : "notes",
    initialState: {
        list : []
    },
    reducers:{
        addAllNotes:(state,action)=>{
            state.list = action.payload;
        },
        addNote:(state,action)=>{
            state.list.push(action.payload); 
        },
        deleteNote:(state,action)=>{
            state = state.list.filter(note=>note.id!==action.payload);
        }
    }
})

export const {addAllNotes,addNote,deleteNote} = noteSlice.actions;
export default noteSlice.reducer;
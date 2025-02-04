import mongoose from "mongoose";
import { Schema } from "mongoose";

const notesSchema = Schema(
  {
    title: {
      type: String,
      required: true,
      min: 1, // at least 1 char
    },
    noteData: {
      type: String,
      required: true,
    },
    voiceNoteUrl: {
      type: String, // This will store the URL or file path of the recorded voice note
      required: false,
    },
  },
  { timestamps: true }
);

const Note = mongoose.model("Note", notesSchema);

export default Note;

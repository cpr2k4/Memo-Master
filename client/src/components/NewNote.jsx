import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveNoteToDb } from "../api/allApi";
import "../style/home.css";
import "../style/NewNote.css";

const NewNote = () => {
  const [title,setTitle] = useState("");
  const [noteData, setNoteData] = useState("");
  const navigate = useNavigate();

  const handleSaveClick = async () => {
    let note = {
      title:title,
      noteData:noteData
    };
    await saveNoteToDb(note);
    navigate("/");
  };

  const handleDeleteClick = () => {
    navigate("/");
  };

  return (
    <div
      style={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      <div className="noteTitleDiv" >
        <label htmlFor="title">Title : </label>
        <input className="titleInput"value={title} onChange={(e)=>setTitle(e.target.value)} id="title" name="title" type="text" placeholder="Enter title" />
      </div>

      <textarea
        className="noteTextArea"
        value={noteData}
        onChange={(e)=>setNoteData(e.target.value)}
        name="note"
        id="1"
        cols="50"
        rows="20"
        placeholder="Type note..."
      ></textarea>

      <div style={{display:"flex"}}>
        <button className="button-56 saveBtn btns" onClick={() => handleSaveClick()}>
          Save
        </button>
        <button className="button-56 deleteBtn btns" onClick={handleDeleteClick}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default NewNote;

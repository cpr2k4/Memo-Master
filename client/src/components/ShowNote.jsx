import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { deleteNote, saveEditedNote } from "../api/allApi";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "../style/home.css";
import "../style/NewNote.css";

const ShowNote = () => {
  const { id } = useParams();
  const notes = useSelector((state) => state.notes.list);

  const selectedNote = notes.find((note) => note._id === id);

  const [title, setTitle] = useState(selectedNote.title);
  const [noteData, setNoteData] = useState(selectedNote.noteData);

  const navigate = useNavigate();
  const handleSaveClick = async () => {
    let note = {
      title: title,
      noteData: noteData,
    };
    // console.log(note);
    await saveEditedNote(id, note);
    navigate("/");
  };

  const handleDeleteClick = async () => {
    await deleteNote(id);
    navigate("/");
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
        className="Note"
      >
        <button className="button-56 backBtn" onClick={()=>navigate("/")}>
          <ArrowBackIcon fontSize="small" />
          &nbsp;back
        </button>

        <div className="noteTitleDiv">
          <label htmlFor="title">Title : </label>
          <input  
            className="titleInput"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="title"
            name="title"
            type="text"
          />
        </div>

        <textarea
          className="noteTextArea"
          value={noteData}
          onChange={(e) => setNoteData(e.target.value)}
          name="note"
          id="1"
          cols="50"
          rows="20"
        ></textarea>

        <div style={{ display: "flex" }}>
          <button
            className="saveBtn button-56 btns"
            onClick={() => handleSaveClick()}
          >
            Save
          </button>
          <button
            className="deleteBtn button-56 btns"
            onClick={() => handleDeleteClick()}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default ShowNote;

import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useRef } from "react";
import { deleteNote, saveEditedNote } from "../api/allApi";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MicIcon from "@mui/icons-material/Mic";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import "../style/home.css";
import "../style/NewNote.css";

const ShowNote = () => {
  const { id } = useParams();
  const notes = useSelector((state) => state.notes.list);

  const selectedNote = notes.find((note) => note._id === id);

  const [title, setTitle] = useState(selectedNote.title);
  const [noteData, setNoteData] = useState(selectedNote.noteData);
  const [voiceNoteUrl, setVoiceNoteUrl] = useState(selectedNote.voiceNoteUrl || "");

  const navigate = useNavigate();

  // Audio Management
  const audioRef = useRef(new Audio(voiceNoteUrl));
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayVoiceNote = () => {
    if (!voiceNoteUrl) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }

    audioRef.current.onended = () => {
      setIsPlaying(false);
    };
  };

  const handlePauseVoiceNote = () => {
    if (!voiceNoteUrl) return;
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const handleResumeVoiceNote = () => {
    if (!voiceNoteUrl) return;
    audioRef.current.play();
    setIsPlaying(true);
  };

  const handleSaveClick = async () => {
    let note = {
      title: title,
      noteData: noteData,
    };
    await saveEditedNote(id, note);
    navigate("/");
  };

  const handleDeleteClick = async () => {
    await deleteNote(id);
    navigate("/");
  };

  // Text-to-Speech Functionality
  const [synth] = useState(window.speechSynthesis);
  const [utterance] = useState(new SpeechSynthesisUtterance());
  const [isPaused, setIsPaused] = useState(false);

  const handleReadNote = () => {
    if (!noteData.trim()) {
      alert("No text available to read!");
      return;
    }

    if (synth.speaking) {
      synth.cancel(); // Stop any ongoing speech
    }

    utterance.text = noteData;
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.lang = "en-US";

    synth.speak(utterance);
    setIsPaused(false); // Reset paused state
  };

  const handlePause = () => {
    if (synth.speaking && !isPaused) {
      synth.pause();
      setIsPaused(true);
    }
  };

  const handleResume = () => {
    if (isPaused) {
      synth.resume();
      setIsPaused(false);
    }
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
        <button className="button-56 backBtn" onClick={() => navigate("/")}>
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

        <div style={{ display: "flex", gap: "10px" }}>
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

          {voiceNoteUrl ? (
            <>
              <button
                className="listenBtn button-56 btns"
                onClick={handlePlayVoiceNote}
                style={{width:"auto",backgroundColor:"brown",color:"white"}}
              >
                {isPlaying ? (
                  <>
                    <PauseIcon fontSize="small" />
                    &nbsp;Pause Voice Note
                  </>
                ) : (
                  <>
                    <PlayArrowIcon fontSize="small" />
                    &nbsp;Listen to Voice Note
                  </>
                )}
              </button>
              <button
                className="resumeBtn button-56 btns"
                onClick={handleResumeVoiceNote}
              >
                <PlayArrowIcon fontSize="small" />
                &nbsp;Resume
              </button>
            </>
          ) : (
            <>
              <button className="readBtn button-56 btns" onClick={handleReadNote}>
                <MicIcon fontSize="small" />
                &nbsp;Read from start
              </button>
              <button className="pauseBtn button-56 btns" onClick={handlePause}>
                <PauseIcon fontSize="small" />
                &nbsp;Pause
              </button>
              <button className="resumeBtn button-56 btns" onClick={handleResume}>
                <PlayArrowIcon fontSize="small" />
                &nbsp;Continue
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ShowNote;

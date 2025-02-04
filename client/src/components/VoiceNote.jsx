import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import MicIcon from "@mui/icons-material/Mic";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ReplayIcon from "@mui/icons-material/Replay";
import SaveIcon from "@mui/icons-material/Save";
import { saveNoteToDb } from "../api/allApi.js"; // Import the saveNoteToDb function

const VoiceNote = () => {
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [title, setTitle] = useState("");
  const [noteData, setSummary] = useState("");
  const mediaRecorderRef = useRef(null);
  const chunks = useRef([]);

  const startRecording = async () => {
    if (!title.trim() || !noteData.trim()) {
      alert("Please provide a title and summary before starting recording.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = (e) => {
        chunks.current.push(e.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunks.current, { type: "audio/webm" });
        setAudioBlob(blob);
        chunks.current = []; // Clear chunks for next recording
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setIsPaused(false);
    } catch (err) {
      alert("Error accessing microphone: " + err.message);
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.pause();
      setIsPaused(true);
    }
  };

  const resumeRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "paused") {
      mediaRecorderRef.current.resume();
      setIsPaused(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);
    }
  };

  const reRecord = () => {
    setAudioBlob(null);
    startRecording();
  };

  const saveRecording = async () => {
    if (audioBlob) {
      const reader = new FileReader();
      reader.readAsDataURL(audioBlob);
      reader.onloadend = async () => {
        const audioBase64 = reader.result; // Convert Blob to Base64
        const data = {
          title,
        noteData,
          voiceNoteUrl: audioBase64, // Send audio as Base64 string
        };

        try {
          await saveNoteToDb(data); // Send data to the API
          alert("Voice note saved successfully!");
          navigate("/"); // Navigate back to home or notes list
        } catch (err) {
          console.error("Error while saving the voice note:", err.message);
          alert("Failed to save the voice note. Please try again.");
        }
      };
    } else {
      alert("No recording to save!");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        marginTop: "50px",
      }}
    >
      <h2>Record Your Voice Note</h2>

      {!isRecording && !audioBlob && (
        <>
          <input
            type="text"
            placeholder="Enter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: "300px", padding: "10px", fontSize: "16px" }}
          />
          <textarea
            placeholder="Enter Summary"
            value={noteData}
            onChange={(e) => setSummary(e.target.value)}
            rows="4"
            style={{ width: "300px", padding: "10px", fontSize: "16px" }}
          ></textarea>
          <button className="button-56" onClick={startRecording}>
            <MicIcon fontSize="small" />
            &nbsp;Start Recording
          </button>
        </>
      )}

      {isRecording && (
        <div style={{ display: "flex", gap: "10px" }}>
          <button className="button-56" onClick={pauseRecording}>
            <PauseIcon fontSize="small" />
            &nbsp;Pause
          </button>
          <button className="button-56" onClick={resumeRecording}>
            <PlayArrowIcon fontSize="small" />
            &nbsp;Continue
          </button>
          <button className="button-56" onClick={stopRecording}>
            <SaveIcon fontSize="small" />
            &nbsp;Stop
          </button>
        </div>
      )}

      {audioBlob && (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
          <audio controls src={URL.createObjectURL(audioBlob)}></audio>
          <div style={{ display: "flex", gap: "10px" }}>
            <button className="button-56" onClick={reRecord}>
              <ReplayIcon fontSize="small" />
              &nbsp;Re-record
            </button>
            <button className="button-56" onClick={saveRecording}>
              <SaveIcon fontSize="small" />
              &nbsp;Save Note
            </button>
          </div>
        </div>
      )}

      <button className="button-56" onClick={() => navigate("/")}>
        Go Back
      </button>
    </div>
  );
};

export default VoiceNote;
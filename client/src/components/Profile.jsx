import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {AutoStories} from '@mui/icons-material';
import { useSelector } from "react-redux";
import "../style/Profile.css";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function Profile() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //allNotes
  const allNotes = useSelector(state=>state.notes.list || []);

  return (
    <div style={{display:"flex",alignItems:"center",flexDirection:"column"}}>
      <Button className="profileBtn" onClick={handleClickOpen}>
        Profile
      </Button>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent dividers>
          <div>
            <img src="/profile.jpeg" alt="db" className="profilePicExtra" />
          </div>
          <div className="usernameStyle">
            <h3>Chinmay Regade</h3>
          </div>
          <div className="noOfNotes">
            <p style={{display:"flex",alignItems:"center"}}><span><AutoStories /></span> &nbsp;- {allNotes.length} Notes</p>
          </div>
          <div className="notesList">
            <h4>Notes:</h4>
            <ul>
                {
                    allNotes.map((note,idx)=>(
                        <li style={{margin:"0.25rem",width: "",listStyle:"number"}} key={idx}>
                            <a href={`http://localhost:5173/showNote/${note._id}`}>{note.title}</a>
                        </li>
                    ))
                }
            </ul>
          </div>
        </DialogContent>

        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}

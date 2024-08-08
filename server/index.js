import express from "express";
const app = express();
import {dbConnect} from "./db/db.js";
import cors from "cors";
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { isAuthenticated } from "./middlewares/middleware.js";
import { saveNoteToDb ,getNotes,getSingleNote,saveUpdatedNote,deleteNote} from "./controller/notes-controller.js";
import { handleSignup,handleLogin } from "./controller/user-constroller.js";

const port = 8080;

//connect to db
dbConnect();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({credentials:true}));
// app.use(cors({
//     origin: 'http://localhost:5173', // Adjust based on your frontend URL
//     credentials: true, // Allow credentials (cookies) to be sent
// }));


// Session configuration
app.use(session({
    secret: 'ManOfSteelKey', 
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1:27017/NotesApp' }),
    cookie: {
        secure: false, // Set to true if using HTTPS
        httpOnly: true, // Ensures the cookie is sent only over HTTP(S), not accessible via client-side JavaScript
        maxAge: 1000 * 60 * 60 * 24 * 30 * 12, // Cookie expiration time (30 day)
    }
}));

app.listen(port,()=>{
    console.log(`Server listening at port : ${port}`);
})

app.get("/",(req,res)=>{
    res.send("hello")
})

// Apply the middleware to routes you want to protect
app.get("/getNote", isAuthenticated, getSingleNote);
app.get("/allNotes", isAuthenticated, getNotes);

app.post("/new", isAuthenticated, saveNoteToDb);
app.put("/saveEditedNote/:id", isAuthenticated, saveUpdatedNote);

app.delete("/:id", isAuthenticated, deleteNote);

//signup and login
app.post("/signup",handleSignup);
app.post("/login",handleLogin);
app.post("/logout",handleLogout);

app.get("*",(req,res)=>{
    res.send("Page not found!!!");
})
import { useEffect ,useState} from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllNotes } from "../api/allApi";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Grid from "@mui/material/Grid";
import { addAllNotes } from "../redux/noteSlice";
import { useSelector } from "react-redux";
import { ellipsis } from "../utils/ellipsis";
import { useContext } from "react";
import TitleContext from "../context/TitleContext";

const AllNotes = () => {
  const dispatch = useDispatch();
  let Notes = [];

  useEffect(() => {
    const getNotes = async () => {
      Notes = await getAllNotes();
      dispatch(addAllNotes(Notes));
    };
    getNotes();
  }, []);

  const navigate = useNavigate();

  const handleCardClick = async (id) => {
    console.log(id);
    navigate(`/showNote/${id}`);
  };

  const allNotes = useSelector((state) => state.notes.list);
  //filter out on the basis of title provided

  const [filteredNotes,setFilteredNotes] = useState([]);
  const { title } = useContext(TitleContext);

  useEffect(() => {
    if (title.length > 0) {
     const filtered = allNotes.filter((note) =>
        note.title.toLowerCase().includes(title.toLowerCase())
      );
      setFilteredNotes(filtered);
    } else {
      setFilteredNotes(allNotes);
    }
  },[title,allNotes]);

  //to highlight the matched substring in note.title 
  const getHighlightedTitle = (noteTitle)=>{
    let n = noteTitle.length;
    const startidx = noteTitle.toLowerCase().indexOf(title.toLowerCase());
    const endidx = startidx + title.length;
    const before = noteTitle.slice(0,startidx);
    const match = noteTitle.slice(startidx,endidx);
    const after = noteTitle.slice(endidx,n);
    return(
      <div>
        <span>{before}</span>
        <span style={{backgroundColor:"yellow"}}>{match}</span>
        <span>{after}</span>
      </div>
    )
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "3rem",
        marginBottom: "5rem",
      }}
    >
      <Grid container spacing={6} style={{ width: "90%" }}>
        {filteredNotes.length ? (
          filteredNotes.map((note, idx) => (
            <Grid item lg={4} md={6} xs={12} key={idx}>
              <div style={{ height: "100%" }}>
                <Card
                  sx={{
                    maxWidth: 320,
                    minHeight: 280,
                    margin: "1rem",
                    height: "100%",
                    boxShadow: "0px 4px 12px rgba(0,0,0,0.4)",
                  }}  
                >
                  <CardActionArea
                    onClick={() => handleCardClick(note._id)}
                    style={{ height: "100%" }}
                  >
                    <CardContent style={{ height: "100%" }}>
                      <Typography gutterBottom variant="h5" component="div">
                        {
                          title.length===0?
                            <div>{note.title}</div>
                          :
                          getHighlightedTitle(note.title)
                        }  
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {ellipsis(note.noteData)}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </div>
            </Grid>
          ))
        ) : (
          <p>No notes found!</p>
        )}
      </Grid>
    </div>
  );
};

export default AllNotes;

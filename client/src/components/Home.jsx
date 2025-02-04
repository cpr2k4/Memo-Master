import React from 'react'
import AllNotes from './AllNotes'
import "../style/home.css"
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';


const Home = () => {
  return (
    <div>
      <a className='button-56' href='/new' style={{width:"250px"}}>Add a new Note?</a>
      <a className='button-56' href='/voice-note' style={{width:"280px",backgroundColor:"#4E3A39",color:"white"}}>Add a new Voice Note <KeyboardVoiceIcon/></a>
      {
        <AllNotes />
      }
    </div>
  )
}

export default Home

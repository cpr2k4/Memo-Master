import React from 'react'
import AllNotes from './AllNotes'
import "../style/home.css"
import {Link} from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <a className='button-56' href='/new' style={{width:"250px"}}>Add a new Note?</a>
      {
        <AllNotes />
      }
    </div>
  )
}

export default Home

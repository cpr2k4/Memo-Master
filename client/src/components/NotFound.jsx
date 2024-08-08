import React from 'react'
import "../style/home.css"
import {Link} from 'react-router-dom'
const NotFound = () => {
  return (
    <div >
      <Link to="/"> 
        <button style={{position:"absolute",marginLeft:"1rem"}} className="button-56" >Go back</button>
      </Link>
      <img src="/Notfound.png" alt="nf" style={{width:"100%",height:"80%"}}/>
    </div>
  )
}

export default NotFound

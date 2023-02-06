import React, { useState,useEffect } from 'react'
import {onAuthStateChanged} from 'firebase/auth'
import { Link } from 'react-router-dom'
import { db, auth } from '../firebase'
import '../styles/Room.css'
export default function Room() {
    const [room,setRoom ] = useState('')
    const [user,setUser ] = useState('')
    useEffect(() => {
        onAuthStateChanged(auth , CurrentUser => {  
          setUser(CurrentUser)
        })
         },[])
         
    return (
    <div class='room'>
        {user.email}
        <h1>Enter room name</h1>
        <input value={room} onChange={e => setRoom(e.target.value)} type="text" />
        <Link to={`/chat/` + room }><button>Acces</button></Link>
    </div>
  )
}

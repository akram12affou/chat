import React, { useState,useEffect } from 'react'
import {onAuthStateChanged} from 'firebase/auth'
import { Link } from 'react-router-dom'
import { auth } from '../firebase'
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
        <h1>Enter room name</h1>
        <input value={room} onChange={e => setRoom(e.target.value)} type="text" />
        <Link to={`/chat/` + room }><button class='acces-button' disabled={room.length == 0}>Acces</button></Link>
    </div>
  )
}

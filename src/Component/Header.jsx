import React,{useState,useEffect} from 'react'
import '../styles/Header.css'
import {onAuthStateChanged} from 'firebase/auth'
import { db, auth } from '../firebase'
function Header() {
  const [user,setUser ] = useState('')
  useEffect(() => {
      onAuthStateChanged(auth , CurrentUser => {  
        setUser(CurrentUser)
      })
       },[])
  return (
    <div class='logo'>Chat App {user.email}</div>
  )
}

export default Header
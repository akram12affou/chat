import React,{useState,useEffect} from 'react'
import '../styles/Header.css'
import {onAuthStateChanged,signOut} from 'firebase/auth'
import { db, auth } from '../firebase'
function Header() {
  const [user,setUser ] = useState('')
  useEffect(() => {
      onAuthStateChanged(auth , CurrentUser => {  
        setUser(CurrentUser)
      })
       },[])
       const logOut = async () => {
        await signOut(auth)
        window.location = '/'
       }
  return (
    <div class='logo'>Chat App 
   {' '} <span>{user?.email}</span>
   <button onClick={logOut}>Sign Out</button>
    </div>
  )
}

export default Header
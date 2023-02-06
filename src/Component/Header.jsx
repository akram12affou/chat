import React,{useState,useEffect} from 'react'
import '../styles/Header.css'
import {onAuthStateChanged,signOut} from 'firebase/auth'
import { db, auth } from '../firebase'
import { useNavigate } from 'react-router-dom'
function Header() {
  const navigate = useNavigate()
  const [user,setUser] = useState('')
  useEffect(() => {
      onAuthStateChanged(auth , CurrentUser => {  
        setUser(CurrentUser)
      })
       },[])
       const logOut = async () => {
        await signOut(auth)
        navigate('/')
       }
  return (
    <div class='header'>
      <div class='logo'>Chat App </div>
      <div>
  <span class='userEmail'>{user?.displayName}</span>{' '}
   {user && <button onClick={logOut} class='sign-out'>Sign Out</button>}
    
   </div>
   </div>
  )
}

export default Header
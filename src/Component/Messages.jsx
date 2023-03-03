import React,{useState,useEffect} from 'react'
import { auth } from '../firebase'

import {onAuthStateChanged} from 'firebase/auth'
function Messages({e,i,handleDelete}) {
    const [user,setUser ] = useState('')
    useEffect(() => {
        onAuthStateChanged(auth , CurrentUser => {  
          setUser(CurrentUser)
        })
         },[])
  return (
    <div><div class={e.email==user?.email && 'message'}>
    {e.message}
    {' '}
    {e.name}{e.email==user?.email && <button onClick={() => handleDelete(e.id,i)}>X</button>}
    <br />
  </div></div>
  )
}

export default Messages
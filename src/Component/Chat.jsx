import React, { useState,useEffect } from 'react'

import {onAuthStateChanged} from 'firebase/auth'
import { db, auth } from '../firebase'
import { useParams } from 'react-router-dom'

import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, where } from 'firebase/firestore'
import { async } from '@firebase/util'
function Chat() {
    const [user,setUser ] = useState('')
  useEffect(() => {
      onAuthStateChanged(auth , CurrentUser => {  
        setUser(CurrentUser)
      })
       },[])
    const [message, setMessage] = useState([])
    const [messages, setMessages] = useState([])
    const {room} = useParams()
    console.log(room)
    const messageRef = collection(db , 'conv')
    const q = query(messageRef,where('room' ,'==', room),orderBy('createdAt'));
    const getmessages = async () => {
        const data = await getDocs(q)
        setMessages(data.docs.map((data) => (
          {...data.data() , id : data.id}
        )))
      }
      useEffect(( ) => {
        getmessages()
      },[])
      useEffect(( ) => {
        getmessages()
      },[messageRef])
      console.log(messages)
      const handleSend =async () => {
        let mes = message
        setMessage('')
        setMessages(prev => {return(
            [...prev , {message:mes, email:user.email}])
        }
        )
        await addDoc(messageRef,{ 
            message:mes,
            email:user?.email,
            createdAt : new Date().getTime(),
            room:room
        })
      }
      const handleDelete =async (id,i) => {
        if(id==undefined){
            let newarr = []
            messages.map((e,index) => {
                if(index==i){
                            return
                 }
                        newarr.push(e)
                })
                    setMessages(newarr)
                    return;
        }
        setMessages(prev => {return(
            prev.filter(e => e.id !== id)
            )
        }
        )
         await deleteDoc(doc(db,'conv',id))  
      }
  return (
    <div>
        <h1>Welcome to room '{room}'</h1>
           {messages.map((e,i) => {
             return(
                <>
                  {e.message}
                  {' '}
                  {e.email}{e.email==user?.email && <button onClick={() => handleDelete(e.id,i)}>X</button>}
                  <hr />
                  
                </>
             )
           })}
           <br />
           <input type="text" value={message} onChange={e => setMessage(e.target.value)}/><button onClick={handleSend}>SEND</button>
    </div>
  )
}

export default Chat
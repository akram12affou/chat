import React,{useState} from 'react'
import { createUserWithEmailAndPassword,signInWithEmailAndPassword} from 'firebase/auth'
import { db, auth } from '../firebase'
import '../styles/Login.css'
function Login() {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [showregister , setShowregister] = useState(false)
    const handleLogin =async() => {
        if(showregister==false){
            try{
                await signInWithEmailAndPassword(auth,email,password);
                setEmail('')
                setPassword('')
                window.location='/roomnum'
              }catch(err){
                  console.log(err.message)
              }
        }else{
            try{
                await createUserWithEmailAndPassword(auth,email,password);
                setEmail('')
                setPassword('')
                window.location='/roomnum'
              }catch(err){
                  console.log(err.message)
              }
            
        }
    }
  return (
    <div>
        {!showregister && 
        <>
        <h2>Sign Up</h2>
        <label >Email :</label>
        <input value={email} onChange={e => setEmail(e.target.value)} type="text" />
        <label >password :</label>
        <input value={password} onChange={e => setPassword(e.target.value)} type="text" />
        <button onClick={handleLogin}>Login</button>
        <p onClick={() => setShowregister(true)}>Create an account</p>
        </>
        }
    {showregister && 
        <>
        <h2>Sign In</h2>
        <label >Email :</label>
        <input value={email} onChange={e => setEmail(e.target.value)} type="text" />
        <label >password :</label>
        <input value={password} onChange={e => setPassword(e.target.value)} type="text" />
        <button onClick={handleLogin}>Login</button>
        <p onClick={() => setShowregister(false)}>I already have an account</p>
        </>
        }
    </div>
  )
}

export default Login
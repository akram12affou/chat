import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";
import {useNavigate } from "react-router-dom";
import "../styles/Login.css";
function Login() {
  const navigate = useNavigate()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showregister, setShowregister] = useState(false);
  const handleLogin = async () => {
    if (showregister == false) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        setEmail("");
        setPassword("");
        await updateProfile(auth.currentUser, { displayName: name }).catch(
          (err) => console.log(err)
        );
        navigate("/roomnum")
      } catch (err) {
        console.log(err.message);
      }
    } else {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        setEmail("");
        setPassword("");
        await updateProfile(auth.currentUser, { displayName: name }).catch(
          (err) => console.log(err)
        );
        window.location = "/roomnum";
      } catch (err) {
        console.log(err.message);
      }
    }
  };
  return (
    <div class="login">
      {!showregister && (
        <>
          <h2>Sign Up</h2>
          Name :
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label>Email :</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
          />
          <label>password :</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="text"
          />
          <button class="login-button" onClick={handleLogin}>
            Login
          </button>
          <p class="p-cases" onClick={() => setShowregister(true)}>
            Create an account
          </p>
        </>
      )}
      {showregister && (
        <>
          <h2>Sign In</h2>
          Name :
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label>Email :</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
          />
          <label>password :</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="text"
          />
          <button class="login-button" onClick={handleLogin}>
            Sign In
          </button>
          <p class="p-cases" onClick={() => setShowregister(false)}>
            I already have an account
          </p>
        </>
      )}
    </div>
  );
}

export default Login;

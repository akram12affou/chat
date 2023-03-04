import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import "../styles/Messages.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { onAuthStateChanged } from "firebase/auth";
function Messages({ e, i, handleDelete }) {
  const [user, setUser] = useState("");
  useEffect(() => {
    onAuthStateChanged(auth, (CurrentUser) => {
      setUser(CurrentUser);
    });
  }, []);
  return (
    <div class={e.email == user?.email && 'message-container'}>
      {e.email == user?.email && (
          <button className="delete-icon" onClick={() => handleDelete(e.id, i)}>
            <DeleteIcon />
          </button>
        )}
    <div class={e.email == user?.email ? "your-message" : "a-message"}>
      <div className="name">{e.name}</div>
      <span className="message-content">
      
        {e.message}
       
      </span>
     
    </div>
    
    </div>
  );
}

export default Messages;

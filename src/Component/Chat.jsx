import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../firebase";
import { useParams } from "react-router-dom";
import "../styles/chat.css";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  orderBy,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import Messages from "./Messages";
function Chat() {
  const [user, setUser] = useState("");
  useEffect(() => {
    onAuthStateChanged(auth, (CurrentUser) => {
      setUser(CurrentUser);
    });
  }, []);
  const [message, setMessage] = useState([]);
  const [messages, setMessages] = useState([]);
  const { room } = useParams();
  const messageRef = collection(db, "conv");
  const q = query(messageRef, where("room", "==", room), orderBy("createdAt"));
  useEffect(() => {
    const unsuscribe = onSnapshot(q, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });
    return () => unsuscribe();
  }, []);
  const handleSend = async () => {
    let mes = message;
    setMessage("");
    setMessages((prev) => {
      return [
        ...prev,
        { message: mes, name: user?.displayName, email: user?.email },
      ];
    });
    await addDoc(messageRef, {
      message: mes,
      email: user?.email,
      createdAt: new Date().getTime(),
      room: room,
      name: user?.displayName,
    });
  };
  const handleDelete = async (id, i) => {
    if (id == undefined) {
      let newarr = [];
      messages.map((e, index) => {
        if (index == i) {
          return;
        }
        newarr.push(e);
      });
      setMessages(newarr);
      return;
    }
    setMessages((prev) => {
      return prev.filter((e) => e.id !== id);
    });
    await deleteDoc(doc(db, "conv", id));
  };
  return (
    <div class="chat">
      <h1>Welcome to room '{room}'</h1>
      <div class="conv">
        {messages.map((e, i) => {
          return <Messages e={e} i={i} handleDelete={handleDelete} />;
        })}
      </div>
      <br />
      <div className="send-form">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handleSend}>SEND</button>
      </div>
    </div>
  );
}

export default Chat;

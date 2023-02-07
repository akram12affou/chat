import { initializeApp } from "firebase/app";
import {getFirestore } from 'firebase/firestore'
import {getAuth} from 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyDydLG9Nrd4ruL44v93Gx6Xc-8xXXEvOkk",
  authDomain: "chat-c3b00.firebaseapp.com",
  projectId: "chat-c3b00",
  storageBucket: "chat-c3b00.appspot.com",
  messagingSenderId: "1041472469021",
  appId: "1:1041472469021:web:daa038f04a98bb06c5aef4",
  measurementId: "G-ZVKS5GNXER"
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)

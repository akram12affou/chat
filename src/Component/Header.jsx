import React, { useState, useEffect } from "react";
import "../styles/Header.css";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  useEffect(() => {
    onAuthStateChanged(auth, (CurrentUser) => {
      setUser(CurrentUser);
    });
  }, []);
  const logOut = async () => {
    await signOut(auth);
    navigate("/");
  };
  return (
    <div class="header">
      <div class="logo">Fas<span>t</span>ext</div>
      <div className="user-info">
        <span class="userName">{user && <><AccountCircleIcon/> {user?.displayName}</>}</span>{" "}
        {user && (
          <>|
            <button onClick={logOut} class="sign-out">
            Sign Out
          </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;

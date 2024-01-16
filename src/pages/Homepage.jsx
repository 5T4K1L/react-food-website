import React, { useState } from "react";
import "../styles/Homepage.css";
import "../styles/Global.css";
import Navbar from "../components/Navbar";
import Featured from "../components/Featured";
import Category from "../components/Category";
import BestSeller from "../components/BestSeller";
import MustTry from "../components/MustTry";
import { onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { auth } from "../firebase";

const Homepage = () => {
  const [currentUser, setUser] = useState();
  onAuthStateChanged(auth, (user) => {
    setUser(user);
  });

  const handleLogin = async () => {
    signInAnonymously(auth);
  };
  return (
    <div className="homepageContainer">
      {!currentUser ? (
        <div className="loginAsGuest">
          <h1>Kuya Jher</h1>
          <button onClick={handleLogin}>Login as Guest</button>
        </div>
      ) : (
        <>
          <Navbar />
          <Featured />
          <Category />
          <BestSeller />
          <MustTry />
        </>
      )}
    </div>
  );
};

export default Homepage;

import React from "react";
import "../styles/Homepage.css";
import "../styles/Global.css";
import Navbar from "../components/Navbar";
import Featured from "../components/Featured";
import Category from "../components/Category";
import BestSeller from "../components/BestSeller";
import MustTry from "../components/MustTry";

const Homepage = () => {
  return (
    <div className="homepageContainer">
      <Navbar />
      <Featured />
      <Category />
      <BestSeller />
      <MustTry />
    </div>
  );
};

export default Homepage;

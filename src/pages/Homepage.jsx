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
      <meta
        name="google-adsense-account"
        content="ca-pub-9490464779487082"
      ></meta>
      <Navbar />
      <Featured />
      <Category />
      <BestSeller />
      <MustTry />
    </div>
  );
};

export default Homepage;

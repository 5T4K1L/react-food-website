import React from "react";
import "../styles/Featured.css";
import dummyPic from "../images/pexels-lisa-fotios-1373915.jpg";

const Featured = () => {
  return (
    <div className="featuredContainer">
      <div className="leftSide">
        <p>Product Name</p>
        <button>VIEW PRODUCT</button>
      </div>
      <div className="rightSide">
        <img src={dummyPic} alt="" />
      </div>
    </div>
  );
};

export default Featured;

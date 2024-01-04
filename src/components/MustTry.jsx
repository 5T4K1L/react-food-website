import React from "react";
import "../styles/BestSeller.css";
import dummyPic from "../images/pexels-lisa-fotios-1373915.jpg";

const MustTry = () => {
  return (
    <div className="bestContainer">
      <p>Must Try</p>
      <div className="productParent">
        <div className="products">
          <a>
            <img src={dummyPic} alt="" />
            <p>Product Name</p>
            <p>Php 120</p>
          </a>
        </div>
        <div className="products">
          <a>
            <img src={dummyPic} alt="" />
            <p>Product Name</p>
            <p>Php 120</p>
          </a>
        </div>
        <div className="products">
          <a>
            <img src={dummyPic} alt="" />
            <p>Product Name</p>
            <p>Php 120</p>
          </a>
        </div>
        <div className="products">
          <a>
            <img src={dummyPic} alt="" />
            <p>Product Name</p>
            <p>Php 120</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default MustTry;

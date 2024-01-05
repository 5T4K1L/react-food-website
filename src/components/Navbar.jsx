import React, { useState } from "react";
import "../styles/Navbar.css";
import cart from "../svgs/add-to-cart-svgrepo-com.svg";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [sideBar, setSideBar] = useState(true);
  const nav = useNavigate();

  const handleSide = () => {
    setSideBar(!sideBar);
  };
  return (
    <div
      className="navbarContainer"
      style={sideBar ? { overflow: "hidden" } : null}
    >
      <div
        style={sideBar ? { right: -50 + "%" } : { right: 0 }}
        className="sideMenu"
      >
        <a href="/products">
          <p>All Products</p>
        </a>
        <a href="">
          <p>Category 1</p>
        </a>
        <a href="">
          <p>Category 2</p>
        </a>
        <a href="">
          <p>Category 3</p>
        </a>
        <a href="">
          <p>Category 4</p>
        </a>
      </div>
      <button onClick={handleSide}>
        <div className="hamburgerMenu">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </button>

      <div className="kuyaJher">
        <p>Kuya Jher</p>
      </div>

      <div className="cart">
        <button>
          <img src={cart} alt="" />
          <p>1</p>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
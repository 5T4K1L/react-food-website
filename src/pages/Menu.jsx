import React from "react";
import Navbar from "../components/Navbar";
import "../styles/Menu.css";

const Menu = () => {
  return (
    <div className="menuContainer">
      <Navbar />
      <div className="links">
        <a href="/products">
          <p>Products</p>
        </a>
        <a href="">
          <p>Category Name</p>
        </a>
        <a href="">
          <p>Category Name</p>
        </a>
        <a href="">
          <p>Category Name</p>
        </a>
        <a href="">
          <p>Category Name</p>
        </a>
      </div>
    </div>
  );
};

export default Menu;

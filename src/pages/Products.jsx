import React from "react";
import Navbar from "../components/Navbar";
import Search from "../components/Search";
import "../styles/Products.css";
import dummyPic from "../images/pexels-lisa-fotios-1373915.jpg";

const Products = () => {
  return (
    <div className="productContainer">
      <Navbar />
      <Search />

      <div className="allProducts">
        <div className="header">
          <p>All Products</p>
        </div>

        <div className="allproducts">
          <div className="productsParent">
            <a href="">
              <div className="product">
                <img src={dummyPic} alt="" />
                <p className="name">Product Name</p>
                <p className="price">Php 120</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;

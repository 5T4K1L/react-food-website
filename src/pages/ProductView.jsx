import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import dummyPic from "../images/pexels-lisa-fotios-1373915.jpg";
import "../styles/ProductView.css";
import { useParams } from "react-router-dom";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const ProductView = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    const getProducts = async () => {
      try {
        const productDoc = await getDoc(doc(db, "products", productId));

        if (productDoc.exists()) {
          setProduct(productDoc.data());
        } else {
          console.error("Product not found");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    getProducts();
  }, [productId]);

  return (
    <div className="viewContainer">
      <Navbar />
      <div className="largeImage">
        <img src={dummyPic} alt="" />
      </div>

      <div className="productDescription">
        <div className="productname">
          <p>{product.product_name}</p>
        </div>
        <div className="productDesc">
          <p>{product.productDescription}</p>
        </div>
      </div>

      <div className="inputs">
        <select name="" id="">
          <option value="">Choose Sizes</option>
          <option value="">Regular ({product.regular_price})</option>
          <option value="">Small ({product.small_price})</option>
          <option value="">Medium ({product.medium_price})</option>
          <option value="">Large ({product.large_price})</option>
        </select>
        <input type="number" placeholder="Quantity" />
      </div>

      <div className="addtocart">
        <p>Php 240</p>
        <button>ADD TO CART</button>
      </div>
    </div>
  );
};

export default ProductView;

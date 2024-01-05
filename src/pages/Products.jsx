import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Search from "../components/Search";
import "../styles/Products.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getAllProducts = async () => {
      const data = await getDocs(collection(db, "products"));
      setProducts(
        data.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    };

    getAllProducts();
  }, []);
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
            {products.map((product) => (
              <div key={product.id}>
                <Link to={`/view-product/${product.id}`}>
                  <div className="product">
                    <img src={product.photoURL} alt="" />
                    <p className="name">{product.product_name}</p>
                    <p className="price">Php {product.regular_price}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;

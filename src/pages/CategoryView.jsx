import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Search from "../components/Search";

const CategoryView = () => {
  const { category } = useParams();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const q = query(
        collection(db, "products"),
        where("category", "==", category)
      );

      const snapshot = await getDocs(q);
      setProducts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    };

    getProducts();
  }, [category]);

  return (
    <div className="productContainer">
      <Navbar />
      <Search />

      <div className="allProducts">
        <div className="header">
          <p>{category}</p>
        </div>

        <div className="allproducts">
          <div className="productsParent">
            {products.map((product, index) => (
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

export default CategoryView;

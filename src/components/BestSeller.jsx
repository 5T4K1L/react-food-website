import React, { useEffect, useState } from "react";
import "../styles/BestSeller.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const BestSeller = () => {
  const [bestSellerProducts, setBestSellerProducts] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      const data = await getDocs(collection(db, "products"));
      const dataProducts = data.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const mustTryProducts = dataProducts.filter(
        (product) => product.must_or_best === "best_seller"
      );

      setBestSellerProducts(mustTryProducts);
    };

    getProducts();
  }, []);
  return (
    <div className="bestContainer">
      <p>Best Seller</p>
      <div className="productParent">
        {bestSellerProducts.map((bestSellerProduct, index) => (
          <div className="products" key={index}>
            <a href={`/view-product/${bestSellerProduct.id}`}>
              <img src={bestSellerProduct.photoURL} alt="" />
              <p>
                {bestSellerProduct.product_name
                  .split(" ")
                  .slice(0, 2)
                  .join(" ") +
                  (bestSellerProduct.product_name.split(" ").length > 2
                    ? ""
                    : "")}
              </p>
              <p>Php {bestSellerProduct.sizes[0].match(/Php (\d+)/)[1]}</p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSeller;

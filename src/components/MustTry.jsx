import React, { useEffect, useState } from "react";
import "../styles/BestSeller.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const MustTry = () => {
  const [mustTryProducts, setMustTryProducts] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      const data = await getDocs(collection(db, "products"));
      const dataProducts = data.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const mustTryProducts = dataProducts.filter(
        (product) => product.must_or_best === "must_try"
      );

      setMustTryProducts(mustTryProducts);
    };

    getProducts();
  }, []);

  return (
    <div className="bestContainer">
      <p>Must Try</p>
      <div className="productParent">
        {mustTryProducts.map((mustTryProducts, index) => (
          <div className="products" key={index}>
            <a href={`/view-product/${mustTryProducts.id}`}>
              <img src={mustTryProducts.photoURL} alt="" />
              <p>
                {mustTryProducts.product_name.split(" ").slice(0, 2).join(" ") +
                  (mustTryProducts.product_name.split(" ").length > 2
                    ? ""
                    : "")}
              </p>
              <p>Php {mustTryProducts.sizes[0].match(/Php (\d+)/)[1]}</p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MustTry;

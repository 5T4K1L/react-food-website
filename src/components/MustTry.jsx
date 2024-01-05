import React, { useEffect, useState } from "react";
import "../styles/BestSeller.css";
import dummyPic from "../images/pexels-lisa-fotios-1373915.jpg";
import { collection, getDocs, query } from "firebase/firestore";
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
      {mustTryProducts.map((mustTryProducts) => (
        <div className="productParent" key={mustTryProducts.id}>
          <div className="products">
            <a>
              <img src={dummyPic} alt="" />
              <p>{mustTryProducts.product_name}</p>
              <p>Php {mustTryProducts.regular_price}</p>
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MustTry;
import React, { useEffect, useState } from "react";
import "../styles/Featured.css";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

const Featured = () => {
  const [featured, setFeatured] = useState([]);
  useEffect(() => {
    const getFeatured = async () => {
      const q = query(
        collection(db, "products"),
        where("featured", "==", true)
      );

      const snapshot = await getDocs(q);
      setFeatured(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    };

    getFeatured();
  }, []);
  return (
    <div className="featuredContainer">
      <div className="leftSide">
        <p>{featured[0]?.product_name}</p>
        <div className="button">
          <a href={`/view-product/${featured[0]?.id}`}>
            <button>VIEW PRODUCT</button>
          </a>
        </div>
      </div>
      <div className="rightSide">
        <img src={featured[0]?.photoURL} alt="" />
      </div>
    </div>
  );
};

export default Featured;

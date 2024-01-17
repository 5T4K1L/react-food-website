import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/Menu.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const Menu = () => {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const getCat = async () => {
      const catDoc = await getDocs(collection(db, "category"));
      setCategory(
        catDoc.docs.map((doc) => ({
          ...doc.data(),
        }))
      );
    };

    getCat();
  }, []);
  return (
    <div className="menuContainer">
      <Navbar />
      <div className="links">
        <a href="/">
          <p>Homepage</p>
        </a>
        <a href="/products">
          <p>Products</p>
        </a>
        {category.map((cat, index) => (
          <div key={index}>
            <a href={`/category/${cat.category}`}>
              <p>{cat.category}</p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;

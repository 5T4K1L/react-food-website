import React, { useEffect, useState } from "react";
import "../styles/Category.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const Category = () => {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const getProducts = async (e) => {
      const cat = await getDocs(collection(db, "category"));
      const catData = cat.docs.map((doc) => doc.data().category);
      setCategory(catData);
    };

    getProducts();
  }, []);

  return (
    <div className="categoryContainer">
      <p>Categories</p>
      <div className="categories">
        {category.map((cat, index) => (
          <a href={`/category/${cat}`} key={index}>
            <button>{cat}</button>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Category;

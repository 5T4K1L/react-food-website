import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AddCategory.css";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

const AddCategory = () => {
  const [cat, setCat] = useState();

  const nav = useNavigate();

  const handleAdd = async () => {
    try {
      await addDoc(collection(db, "category"), {
        category: cat,
      });

      nav(-1);
    } catch (error) {
      console.error("Error adding product:", error.message);
    }
  };

  return (
    <div className="addProduct addCategory">
      <div className="content">
        <div className="input">
          <input
            onChange={(e) => setCat(e.target.value)}
            type="text"
            placeholder="Add Category"
          />
        </div>
        <div className="button">
          <button onClick={handleAdd} className="addcategory">
            Add Category
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;

import React from "react";
import "../styles/Category.css";

const Category = () => {
  return (
    <div className="categoryContainer">
      <p>Categories</p>
      <div className="categories">
        <button>Category 1</button>
        <button>Category 2</button>
        <button>Category 3</button>
        <button>Category 4</button>
      </div>
    </div>
  );
};

export default Category;

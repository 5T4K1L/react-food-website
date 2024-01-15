import React, { useEffect, useState } from "react";
import "../styles/AddProduct.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { debounce } from "lodash";

const AddProduct = () => {
  const [name, setName] = useState();
  const [mustBest, setMustBest] = useState();

  const [size1, setSize1] = useState();
  const [price1, setPrice1] = useState();

  const [category, setCategory] = useState([]);
  useEffect(() => {
    const getCat = async () => {
      const data = await getDocs(collection(db, "category"));
      setCategory(
        data.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    };

    getCat();
  }, []);

  return (
    <div className="addProduct">
      <div className="first">
        <input
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Product Name"
        />
        <select>
          <option>Category</option>
          {category.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.category}
            </option>
          ))}
        </select>
      </div>

      <div className="second">
        <input
          onChange={(e) => setMustBest(e.target.value)}
          type="text"
          placeholder="must_try or best_seller"
        />
        <input hidden type="file" id="productImage" />
        <label htmlFor="productImage">Product Image</label>
      </div>

      <div className="third">
        <input type="text" placeholder="Available Size 1" />
        <input type="text" placeholder="Price" />
      </div>
      <div className="fourth">
        <input type="text" placeholder="Available Size 2" />
        <input type="text" placeholder="Price" />
      </div>
      <div className="fifth">
        <input type="text" placeholder="Available Size 3" />
        <input type="text" placeholder="Price" />
      </div>
      <div className="sixth">
        <input type="text" placeholder="Available Size 4" />
        <input type="text" placeholder="Price" />
      </div>
      <div className="seventh">
        <input type="text" placeholder="Available Size 5" />
        <input type="text" placeholder="Price" />
      </div>
      <div className="eighth">
        <input type="text" placeholder="Available Size 6" />
        <input type="text" placeholder="Price" />
      </div>
      <textarea
        placeholder="Product Description"
        cols="30"
        rows="10"
      ></textarea>
      <button className="addproduct">Add Product</button>
    </div>
  );
};

export default AddProduct;

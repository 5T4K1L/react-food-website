import React, { useEffect, useState } from "react";
import "../styles/AddProduct.css";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { uploadImagesToCloudinary } from "../utils/cloudinary";

// Cloudinary setup
const cloudName = "dqswgivnr";
const uploadPreset = "pajourney";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [mustBest, setMustBest] = useState("");
  const [category, setCategory] = useState([]);
  const [useCat, setUseCat] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState();
  const [flavor, setFlavor] = useState();
  const [toppings, setToppings] = useState();
  const [featured, setFeatured] = useState();

  const [size1, setSize1] = useState();
  const [price1, setPrice1] = useState();
  const [size2, setSize2] = useState();
  const [price2, setPrice2] = useState();
  const [size3, setSize3] = useState();
  const [price3, setPrice3] = useState();
  const [size4, setSize4] = useState();
  const [price4, setPrice4] = useState();
  const [size5, setSize5] = useState();
  const [price5, setPrice5] = useState();

  const nav = useNavigate();

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

  const handleAdd = async () => {
    try {
      let photoURL = "";

      if (file) {
        const uploadedUrls = await uploadImagesToCloudinary(
          [file],
          cloudName,
          uploadPreset
        );
        photoURL = uploadedUrls[0];
      }

      let haveToppings = toppings === "yes";
      let haveFlavor = flavor === "yes";
      let isFeatured = featured === "yes";

      await addDoc(collection(db, "products"), {
        featured: isFeatured,
        have_flavors: haveFlavor,
        have_toppings: haveToppings,
        category: useCat,
        photoURL: photoURL,
        must_or_best: mustBest,
        productDescription: desc,
        product_name: name,
        sizes: [
          size1 + (price1 && ` (Php ${price1})`) || "Not Available",
          size2 + (price2 && ` (Php ${price2})`) || "Not Available",
          size3 + (price3 && ` (Php ${price3})`) || "Not Available",
          size4 + (price4 && ` (Php ${price4})`) || "Not Available",
          size5 + (price5 && ` (Php ${price5})`) || "Not Available",
        ],
      });

      nav(-1);
    } catch (error) {
      console.error("Error adding product:", error.message);
    }
  };

  return (
    <div className="addProduct">
      <div className="first">
        <input
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Product Name"
        />
        <select onChange={(e) => setUseCat(e.target.value)}>
          <option key="default">Category</option>
          {category.map((cat, index) => (
            <option key={index} value={cat.category}>
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
        <input
          onChange={(e) => setFile(e.target.files[0])}
          hidden
          type="file"
          id="productImage"
        />
        <label htmlFor="productImage">Product Image</label>
      </div>

      <div className="third">
        <input
          onChange={(e) => setSize1(e.target.value)}
          type="text"
          placeholder="Available Regular Size"
        />
        <input
          onChange={(e) => setPrice1(e.target.value)}
          type="text"
          placeholder="Regular Price"
        />
      </div>
      <div className="fourth">
        <input
          onChange={(e) => setSize2(e.target.value)}
          type="text"
          placeholder="Available Size 2"
        />
        <input
          onChange={(e) => setPrice2(e.target.value)}
          type="text"
          placeholder="Price"
        />
      </div>
      <div className="fifth">
        <input
          onChange={(e) => setSize3(e.target.value)}
          type="text"
          placeholder="Available Size 3"
        />
        <input
          onChange={(e) => setPrice3(e.target.value)}
          type="text"
          placeholder="Price"
        />
      </div>
      <div className="sixth">
        <input
          onChange={(e) => setSize4(e.target.value)}
          type="text"
          placeholder="Available Size 4"
        />
        <input
          onChange={(e) => setPrice4(e.target.value)}
          type="text"
          placeholder="Price"
        />
      </div>
      <div className="seventh">
        <input
          onChange={(e) => setSize5(e.target.value)}
          type="text"
          placeholder="Available Size 5"
        />
        <input
          onChange={(e) => setPrice5(e.target.value)}
          type="text"
          placeholder="Price"
        />
      </div>
      <div className="eighth">
        <select onChange={(e) => setToppings(e.target.value)}>
          <option>Toppings Available?</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
        <select onChange={(e) => setFlavor(e.target.value)}>
          <option>Flavors Available?</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>
      <div className="ninth">
        <select onChange={(e) => setFeatured(e.target.value)}>
          <option value="">Add to Featured?</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>
      <textarea
        onChange={(e) => setDesc(e.target.value)}
        placeholder="Product Description w/ Toppings/Flavor/etc."
        cols="30"
        rows="10"
      ></textarea>
      <button onClick={handleAdd} className="addproduct">
        Add Product
      </button>
    </div>
  );
};

export default AddProduct;

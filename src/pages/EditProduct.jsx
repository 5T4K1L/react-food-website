import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const EditProduct = () => {
  const [name, setName] = useState("");
  const [mustBest, setMustBest] = useState("");
  const [category, setCategory] = useState([]);
  const [useCat, setUseCat] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState();
  const [product, setProduct] = useState([]);

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

  const { productName } = useParams();

  useEffect(() => {
    const getCat = async () => {
      const q = query(
        collection(db, "products"),
        where("product_name", "==", productName)
      );

      const snapshot = await getDocs(q);
      setProduct(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
        }))
      );

      const data = await getDocs(collection(db, "category"));
      setCategory(
        data.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    };

    getCat();
  }, [productName]);

  const handleAdd = async () => {
    try {
      const q = query(
        collection(db, "products"),
        where("product_name", "==", productName)
      );
      const snapshot = await getDocs(q);

      const docRef = doc(db, "products", snapshot.docs[0].id);

      const storageRef = ref(storage, `your_custom_path/${name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      // Wait for the upload task to complete
      await uploadTask;

      // Get the download URL
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

      // Add document to the "products" collection
      await updateDoc(docRef, {
        category: useCat ? useCat : product[0]?.category || "",
        must_or_best: mustBest ? mustBest : product[0].must_or_best || "",
        productDescription: desc ? desc : product[0]?.productDescription || "",
        product_name: name ? name : product[0]?.product_name || "",
        sizes: [
          size1
            ? size1 + (price1 && ` (Php ${price1})`)
            : product[0].sizes && product[0].sizes[0],

          size2
            ? size2 + (price2 && ` (Php ${price2})`)
            : product[0].sizes && product[0].sizes[1],

          size3
            ? size3 + (price3 && ` (Php ${price3})`)
            : product[0].sizes && product[0].sizes[2],

          size4
            ? size4 + (price4 && ` (Php ${price4})`)
            : product[0].sizes && product[0].sizes[3],

          size5
            ? size5 + (price5 && ` (Php ${price5})`)
            : product[0].sizes && product[0].sizes[4],
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
          defaultValue={product.length > 0 ? product[0].product_name || "" : ""}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Product Name"
        />
        <select
          defaultValue={product.length > 0 && product[0].category}
          onChange={(e) => setUseCat(e.target.value)}
        >
          <option disabled>Category</option>
          {category.map((cat) => (
            <option key={cat.id} value={cat.category}>
              {cat.category}
            </option>
          ))}
        </select>
      </div>

      <div className="second">
        <input
          defaultValue={product.length > 0 ? product[0].must_or_best : ""}
          onChange={(e) => setMustBest(e.target.value)}
          type="text"
          placeholder="must_try or best_seller"
        />
      </div>

      <div className="third">
        <input
          defaultValue={
            product.length > 0 && product[0].sizes && product[0].sizes[0]
              ? product[0].sizes[0].match(/(\w+)/)[0]
              : ""
          }
          onChange={(e) => setSize1(e.target.value)}
          type="text"
          placeholder="Available Size 1"
        />
        <input
          defaultValue={
            product.length > 0 && product[0].sizes && product[0].sizes[0]
              ? product[0].sizes[0].match(/Php (\d+)/)[1]
              : ""
          }
          onChange={(e) => setPrice1(e.target.value)}
          type="text"
          placeholder="Price"
        />
      </div>

      <div className="fourth">
        <input
          defaultValue={
            product.length > 0 && product[0].sizes && product[0].sizes[1]
              ? product[0].sizes[1].match(/(\w+)/)[0]
              : ""
          }
          onChange={(e) => setSize2(e.target.value)}
          type="text"
          placeholder="Available Size 2"
        />
        <input
          defaultValue={
            product.length > 0 && product[0].sizes && product[0].sizes[1]
              ? product[0].sizes[1].match(/Php (\d+)/)[1]
              : ""
          }
          onChange={(e) => setPrice2(e.target.value)}
          type="text"
          placeholder="Price"
        />
      </div>

      <div className="fifth">
        <input
          defaultValue={
            product.length > 0 && product[0].sizes && product[0].sizes[2]
              ? product[0].sizes[2].match(/(\w+)/)[0]
              : ""
          }
          onChange={(e) => setSize3(e.target.value)}
          type="text"
          placeholder="Available Size 3"
        />
        <input
          defaultValue={
            product.length > 0 && product[0].sizes && product[0].sizes[2]
              ? product[0].sizes[2].match(/Php (\d+)/)[1]
              : ""
          }
          onChange={(e) => setPrice3(e.target.value)}
          type="text"
          placeholder="Price"
        />
      </div>

      <div className="sixth">
        <input
          defaultValue={
            product.length > 0 && product[0].sizes && product[0].sizes[3]
              ? product[0].sizes[3].match(/(\w+)/)[0]
              : ""
          }
          onChange={(e) => setSize4(e.target.value)}
          type="text"
          placeholder="Available Size 4"
        />
        <input
          defaultValue={
            product.length > 0 && product[0].sizes && product[0].sizes[3]
              ? product[0].sizes[3].match(/Php (\d+)/)[1]
              : ""
          }
          onChange={(e) => setPrice4(e.target.value)}
          type="text"
          placeholder="Price"
        />
      </div>

      <div className="seventh">
        <input
          defaultValue={
            product.length > 0 && product[0].sizes && product[0].sizes[4]
              ? product[0].sizes[4].match(/(\w+)/)[0]
              : ""
          }
          onChange={(e) => setSize5(e.target.value)}
          type="text"
          placeholder="Available Size 5"
        />
        <input
          defaultValue={
            product.length > 0 && product[0].sizes && product[0].sizes[4]
              ? product[0].sizes[4].match(/Php (\d+)/)[1]
              : ""
          }
          onChange={(e) => setPrice5(e.target.value)}
          type="text"
          placeholder="Price"
        />
      </div>
      <textarea
        onChange={(e) => setDesc(e.target.value)}
        defaultValue={product.length > 0 ? product[0].productDescription : ""}
        placeholder="Product Description"
        cols="30"
        rows="10"
      ></textarea>
      <button onClick={handleAdd} className="addproduct">
        Edit Product
      </button>
    </div>
  );
};

export default EditProduct;

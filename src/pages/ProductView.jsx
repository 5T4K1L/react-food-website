import React, { useCallback, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/ProductView.css";
import { useNavigate, useParams } from "react-router-dom";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { debounce } from "lodash";

const ProductView = () => {
  const [currentUser, setCurrentUser] = useState();
  const nav = useNavigate();

  const { productId } = useParams();
  const [product, setProduct] = useState({});

  const [sizeValue, setSizeValue] = useState();
  const [quantity, setQuantity] = useState(1);

  const [total, setTotal] = useState(0);

  const debouncedSetQuantity = debounce((value) => {
    setQuantity(value);
  }, 100);

  onAuthStateChanged(auth, (user) => {
    setCurrentUser(user);
  });

  useEffect(() => {
    const getProducts = async () => {
      try {
        const productDoc = await getDoc(doc(db, "products", productId));

        if (productDoc.exists()) {
          setProduct(productDoc.data());
        } else {
          console.error("Product not found");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    getProducts();
  }, [productId]);

  useEffect(() => {
    if (sizeValue && product) {
      const price =
        sizeValue === "regular"
          ? product.regular_price
          : sizeValue === "small"
          ? product.small_price
          : sizeValue === "medium"
          ? product.medium_price
          : sizeValue === "large"
          ? product.large_price
          : null;

      const totalPrice = Number(price * quantity);
      setTotal(totalPrice);
    }
  }, [sizeValue, quantity, product]);

  const handleAdd = useCallback(
    async (e) => {
      e.preventDefault();
      console.log(sizeValue);

      if (product) {
        const price =
          sizeValue === "regular"
            ? product.regular_price
            : sizeValue === "small"
            ? product.small_price
            : sizeValue === "medium"
            ? product.medium_price
            : sizeValue === "large"
            ? product.large_price
            : null;

        await addDoc(collection(db, "userCart"), {
          photoURL: product.photoURL,
          price: Number(price * quantity),
          quantity: Number(quantity),
          product_name: product.product_name,
          size: sizeValue,
          uid: currentUser.uid,
        });

        nav(-1);
      }
    },
    [sizeValue, quantity, product, currentUser, nav]
  );

  return (
    <div className="viewContainer">
      <Navbar />
      <div className="largeImage">
        <img src={product.photoURL} alt="" />
      </div>

      <div className="productDescription">
        <div className="productname">
          <p>{product.product_name}</p>
        </div>
        <div className="productDesc">
          <p>{product.productDescription}</p>
        </div>
      </div>

      <div className="inputs">
        <form action=""></form>
        <select
          onChange={(e) => {
            setSizeValue(e.target.value);
          }}
        >
          <option value="">Choose Sizes</option>
          <option value="regular">{`Regular (${product.regular_price})`}</option>
          <option value="small">{`Small (${product.small_price})`}</option>
          <option value="medium">{`Medium (${product.medium_price})`}</option>
          <option value="large">{`Large (${product.large_price})`}</option>
        </select>

        <input
          type="number"
          id="quantity"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => debouncedSetQuantity(e.target.value)}
        />
      </div>

      <div className="addtocart">
        <p name="total">Php {total}</p>
        <button onClick={handleAdd}>ADD TO CART</button>
      </div>
    </div>
  );
};

export default ProductView;

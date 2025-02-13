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

  const [flavor, setFlavor] = useState();
  const [toppings, setToppings] = useState();

  const debouncedSetQuantity = debounce((value) => {
    setQuantity(value);
  }, 100);

  const debouncedSetSize = debounce((value) => {
    setSizeValue(value);
  }, 10);

  const debouncedSetFlavor = debounce((value) => {
    setFlavor(value);
  }, 10);

  const debouncedSetToppings = debounce((value) => {
    setToppings(value);
  }, 10);

  onAuthStateChanged(auth, (user) => {
    setCurrentUser(user);
  });

  useEffect(() => {
    const getProducts = async () => {
      try {
        const productDoc = await getDoc(doc(db, "products", productId));

        if (productDoc.exists()) {
          setProduct(productDoc.data());
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    getProducts();
  }, [productId, sizeValue, quantity, product]);

  const handleAdd = useCallback(
    async (e) => {
      e.preventDefault();

      if (sizeValue) {
        const match = sizeValue.match(/Php (\d+)/);
        const afterPhp = match[1];

        await addDoc(collection(db, "userCart"), {
          flavor: flavor || null,
          toppings: toppings || null,
          photoURL: product.photoURL,
          quantity: Number(quantity),
          product_name: product.product_name,
          size: sizeValue,
          price: Number(afterPhp * quantity),
          uid: currentUser.uid,
        });

        nav(-1);
      }
    },
    [sizeValue, quantity, product, currentUser, nav, flavor, toppings]
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
        <select onChange={(e) => debouncedSetSize(e.target.value)}>
          <option>Choose Sizes</option>
          {product.sizes &&
            product.sizes.map((size) => <option key={size.id}>{size}</option>)}
        </select>
        <input
          type="number"
          id="quantity"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => debouncedSetQuantity(e.target.value)}
        />
      </div>
      {product.have_flavors && product.have_toppings ? (
        <div className="additionals">
          <input type="text" placeholder="Toppings" />
          <input type="text" placeholder="Flavor" />
        </div>
      ) : product.have_flavors ? (
        <div className="additionals">
          <input
            type="text"
            placeholder="Flavor"
            onChange={(e) => debouncedSetFlavor(e.target.value)}
          />
        </div>
      ) : product.have_toppings ? (
        <div className="additionals">
          <input
            type="text"
            placeholder="Toppings"
            onChange={(e) => debouncedSetToppings(e.target.value)}
          />
        </div>
      ) : null}

      <div className="addtocart">
        <button onClick={handleAdd}>ADD TO CART</button>
      </div>
    </div>
  );
};

export default ProductView;

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import "../styles/Cart.css";
import Checkout from "../components/Checkout";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [userUID, setUserUID] = useState();
  const [cart, setCart] = useState([]);
  const [price, setPrice] = useState();
  const [fee, setFee] = useState();
  const nav = useNavigate();

  onAuthStateChanged(auth, (user) => {
    setUserUID(user.uid);
  });

  useEffect(() => {
    const getCart = async () => {
      if (userUID) {
        const q = query(
          collection(db, "userCart"),
          where("uid", "==", userUID)
        );

        const data = await getDocs(q);

        const getFee = await getDocs(collection(db, "addFee"));
        const feeValue = getFee.docs[0]?.data()?.fee;
        setFee(feeValue);

        let totalSum = Number(feeValue || 0);

        const cartData = [];
        data.forEach((doc) => {
          const data = doc.data();
          cartData.push({ id: doc.id, ...data });
          totalSum += Number(data.price);
        });

        setPrice(totalSum);
        setCart(cartData);
      }
    };

    getCart();
  }, [userUID]);

  const handleDelete = async (productID) => {
    await deleteDoc(doc(db, "userCart", productID));

    const q = query(collection(db, "userCart"), where("uid", "==", userUID));
    const data = await getDocs(q);

    const getFee = await getDocs(collection(db, "addFee"));
    const feeValue = getFee.docs[0]?.data()?.fee;
    setFee(feeValue);

    let totalSum = Number(feeValue || 0);

    const updatedCart = [];
    data.forEach((doc) => {
      const cartData = doc.data();
      updatedCart.push({ id: doc.id, ...cartData });
      totalSum += Number(cartData.price);
    });

    setPrice(totalSum);
    setCart(updatedCart);
  };

  return (
    <div className="cartContainer">
      <Navbar />
      {cart.length === 0 ? (
        <h1 className="noItems">
          You have no items <br />
          yet on your cart.
        </h1>
      ) : (
        <div>
          {cart.map((carts, index) => (
            <div className="cartProducts" key={index}>
              <div className="two">
                <div className="cartImage">
                  <img src={carts.photoURL} alt="" />
                </div>
                <div className="cartDesc">
                  <p>{carts.product_name}</p>
                  <p>Product Description</p>
                  <p>{carts.size}</p>
                  <p>x{carts.quantity}</p>
                  <button
                    onClick={() => handleDelete(carts.id)}
                    className="deleteCart"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div className="cartPrice">
                <p>Php {carts.price}</p>
              </div>
            </div>
          ))}
          <Checkout price={price} fee={fee} />
        </div>
      )}
    </div>
  );
};

export default Cart;

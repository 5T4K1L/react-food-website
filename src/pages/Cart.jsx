import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import "../styles/Cart.css";
import Checkout from "../components/Checkout";

const Cart = () => {
  const [userUID, setUserUID] = useState();
  const [cart, setCart] = useState([]);
  const [price, setPrice] = useState();
  const [fee, setFee] = useState();
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
          cartData.push(data);
          totalSum += Number(data.price);
        });

        setPrice(totalSum);
        setCart(cartData);
      }
    };

    getCart();
  }, [userUID]);

  return (
    <div className="cartContainer">
      <Navbar />
      {cart.map((carts) => (
        <div className="cartProducts">
          <div className="two">
            <div className="cartImage">
              <img src={carts.photoURL} alt="" />
            </div>
            <div className="cartDesc">
              <p>{carts.product_name}</p>
              <p>Product Description</p>
              <p>{carts.size}</p>
              <p>x{carts.quantity}</p>
            </div>
          </div>

          <div className="cartPrice">
            <p>Php {carts.price}</p>
          </div>
        </div>
      ))}
      <Checkout price={price} fee={fee} />
    </div>
  );
};

export default Cart;

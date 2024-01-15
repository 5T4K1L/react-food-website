import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import "../styles/Cart.css";
import { debounce } from "lodash";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const [userUID, setUserUID] = useState();
  const [cart, setCart] = useState([]);
  const [price, setPrice] = useState();
  const [fee, setFee] = useState();
  const [customer, setCustomer] = useState();
  const [address, setAddress] = useState();
  const [message, setMessage] = useState();
  const [phone, setPhone] = useState();
  const nav = useNavigate();

  const debouncedSetName = debounce((value) => {
    setCustomer(value);
  }, 10);
  const debouncedSetAddress = debounce((value) => {
    setAddress(value);
  }, 10);
  const debouncedSetMessage = debounce((value) => {
    setMessage(value);
  }, 10);
  const debouncedSetPhone = debounce((value) => {
    setPhone(value);
  }, 10);

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

  const handleCheckout = async (e) => {
    e.preventDefault();

    cart.forEach(async (userCart) => {
      await addDoc(collection(db, "orderedProducts"), {
        phone,
        message,
        customer,
        address,
        productName: userCart.product_name,
        quantity: userCart.quantity,
        size: userCart.size,
        price: userCart.price,
      });
    });

    const q = query(collection(db, "userCart"), where("uid", "==", userUID));
    const snapshot = await getDocs(q);

    snapshot.docs.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });

    nav("/");
  };

  return (
    <div className="checkPageContainer">
      <Navbar></Navbar>
      {cart.map((carts, index) => (
        <div key={index} className="cartProducts">
          <div className="two">
            <div className="cartImage">
              <img src={carts.photoURL} alt="" />
            </div>
            <div className="cartDesc">
              <p>{carts.product_name}</p>
              <p>Product Description</p>
              <p>{carts.size}</p>
              <p>x{carts.quantity}</p>
              <p className="cartPriceCheckout">Php {carts.price}</p>
            </div>
          </div>
        </div>
      ))}
      <div className="forms">
        <input
          onChange={(e) => debouncedSetName(e.target.value)}
          type="text"
          placeholder="Full Name"
        />
        <input
          onChange={(e) => debouncedSetMessage(e.target.value)}
          type="text"
          placeholder="Message"
        />
        <input
          onChange={(e) => debouncedSetPhone(e.target.value)}
          type="text"
          placeholder="Phone"
        />
        <input
          onChange={(e) => debouncedSetAddress(e.target.value)}
          type="text"
          placeholder="Address / Meet Up Place / Pick-up"
        />
      </div>
      <div className="checkoutContainer">
        <div className="prices">
          <div className="fee">
            <p>Fee</p>
            <p>Php {fee}</p>
          </div>
          <div className="total">
            <p>Total</p>
            <p>Php {price}</p>
          </div>
        </div>
        <div className="checkout">
          <a href="/checkout">
            <button onClick={handleCheckout}>Checkout</button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

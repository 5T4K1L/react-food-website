import React, { useEffect, useState } from "react";
import "../styles/Navbar.css";
import cart from "../svgs/add-to-cart-svgrepo-com.svg";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import menu from "../svgs/menu-alt-05-svgrepo-com.svg";

const Navbar = () => {
  const [userUID, setUserUID] = useState();
  const [cartSize, setCartSize] = useState(0);
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
        setCartSize(data.size);
      }
    };

    getCart();
  }, [userUID]);

  return (
    <div className="navbarContainer">
      <div className="menu">
        <a href="/menu">
          <img src={menu} alt="" />
        </a>
      </div>

      <div className="kuyaJher">
        <a href="/">
          <p>Kuya Jher</p>
        </a>
      </div>

      <div className="cart">
        <a href="/cart">
          <button>
            <img src={cart} alt="" />
            <p>{cartSize}</p>
          </button>
        </a>
      </div>
    </div>
  );
};

export default Navbar;

import React, { useEffect, useState } from "react";
import "../styles/Navbar.css";
import cart from "../svgs/add-to-cart-svgrepo-com.svg";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

const Navbar = () => {
  const [sideBar, setSideBar] = useState(true);
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

  const handleSide = () => {
    setSideBar(!sideBar);
  };
  return (
    <div
      className="navbarContainer"
      style={sideBar ? { overflow: "hidden" } : null}
    >
      <div
        style={sideBar ? { right: -50 + "%" } : { right: 0 }}
        className="sideMenu"
      >
        <a href="/products">
          <p>All Products</p>
        </a>
        <a href="">
          <p>Category 1</p>
        </a>
        <a href="">
          <p>Category 2</p>
        </a>
        <a href="">
          <p>Category 3</p>
        </a>
        <a href="">
          <p>Category 4</p>
        </a>
      </div>
      <button onClick={handleSide}>
        <div className="hamburgerMenu">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </button>

      <div className="kuyaJher">
        <p>Kuya Jher</p>
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

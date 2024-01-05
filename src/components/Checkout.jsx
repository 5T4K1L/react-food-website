import React from "react";
import "../styles/Checkout.css";

const Checkout = ({ price }) => {
  return (
    <div className="checkoutContainer">
      <div className="prices">
        <div className="fee">
          <p>Fee</p>
          <p>Php 20</p>
        </div>
        <div className="total">
          <p>Total</p>
          <p>Php {price}</p>
        </div>
      </div>
      <div className="checkout">
        <button>Checkout</button>
      </div>
    </div>
  );
};

export default Checkout;

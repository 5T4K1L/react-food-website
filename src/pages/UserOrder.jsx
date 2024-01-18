import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/UserOrder.css";

const UserOrder = () => {
  const [order, setOrder] = useState([]);
  const { user } = useParams();
  const nav = useNavigate();

  useEffect(() => {
    const getOrders = async () => {
      const q = query(
        collection(db, "orderedProducts"),
        where("customer", "==", user)
      );

      const snapshot = await getDocs(q);
      setOrder(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    };
    getOrders();
  }, [user]);

  const handleOut = async () => {
    if (order.length > 0) {
      await updateDoc(doc(db, "orderedProducts", order[0].id), {
        order_status: "Out for Delivery",
      });
    }
    nav(-1);
  };
  const handleDel = async () => {
    if (order.length > 0) {
      await addDoc(collection(db, "deliveredProduct"), {
        customer: order[0].customer,
        order_status: "Delivered",
        total: order[0].total,
      });

      const userOrderQuery = query(
        collection(db, "orderedProducts"),
        where("customer", "==", order[0].customer)
      );
      const querySnapshot = await getDocs(userOrderQuery);

      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });
    }
    nav(-1);
  };

  return (
    <div className="userOrder">
      {order.length > 0 && <h1>{order[0].customer}</h1>}

      <div className="buttons">
        <button onClick={handleOut}>Out for Delivery</button>
        <button onClick={handleDel}>Delivered</button>
      </div>

      <div className="address">
        <p>Address:</p>
        <p>{order.length > 0 && order[0].address}</p>
      </div>

      <div className="phone">
        <p>Phone:</p>
        <p>{order.length > 0 && order[0].phone}</p>
      </div>

      {order.map((ord, index) => (
        <>
          <div key={index} className="order">
            <p>{ord.productName}</p>
            <p>{ord.quantity}</p>
            <p>{ord.size}</p>
            <p>{ord.price}</p>
          </div>
          <p style={{ fontSize: 18 }}>
            Toppings / Flavors: {ord.flavor && ord.flavor} |{" "}
            {ord.toppings && ord.toppings}
          </p>
        </>
      ))}
      <div className="total">
        <p>Total</p>
        <p>{order.length > 0 && order[0].total}</p>
      </div>

      <div className="message">
        <p>Message:</p>
        <p>{order.length > 0 && order[0].message}</p>
      </div>

      <div className="receipt">
        <button>Download Receipt</button>
      </div>
    </div>
  );
};

export default UserOrder;

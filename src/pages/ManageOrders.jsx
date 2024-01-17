import React, { useEffect, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import "../styles/ManageOrders.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const ManageOrders = () => {
  const [order, setOrder] = useState([]);
  const [deld, setDeld] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let totalIncome = 0;
    const getOrders = async () => {
      const data = await getDocs(collection(db, "orderedProducts"));
      setOrder(
        data.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );

      const snapshot = await getDocs(collection(db, "deliveredProduct"));
      setDeld(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
      deld.forEach((del) => {
        setTotal(Number((totalIncome += del.total)));
      });
    };
    getOrders();
  }, [deld]);

  const uniqueOrders = Array.from(new Set(order.map((ord) => ord.customer)))
    .map((customer) => {
      return order.find((ord) => ord.customer === customer);
    })
    .filter((ord) => ord !== undefined);

  return (
    <div className="manageOrders">
      <AdminNavbar />
      {deld.map((del) => (
        <div key={del.id} className="buttons">
          <div className="links">
            <div className="delivered">
              <p>{del.customer}</p>
              <p>{del.order_status}</p>
              <p>{del.total}</p>
            </div>
          </div>
        </div>
      ))}
      {uniqueOrders.map((ord) => (
        <div className="buttons" key={ord.id}>
          <div className="links">
            {ord.order_status === "Undelivered" ? (
              <a href={`/orders/${ord.customer}`} className="undelivered">
                <p>{ord.customer}</p>
                <p>{ord.order_status}</p>
              </a>
            ) : ord.order_status === "Out for Delivery" ? (
              <a href={`/orders/${ord.customer}`} className="outfordelivery">
                <p>{ord.customer}</p>
                <p>{ord.order_status}</p>
              </a>
            ) : null}
          </div>
        </div>
      ))}

      <div className="prices">
        <div className="totalIncome">
          <p>Total Income:</p>
          <p>{total}</p>
        </div>
      </div>
    </div>
  );
};

export default ManageOrders;

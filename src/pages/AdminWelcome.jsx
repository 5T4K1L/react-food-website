import React, { useState } from "react";
import kuyajher from "../images/kuyajher.jpg";
import "../styles/AdminWelcome.css";
import { useNavigate } from "react-router-dom";

const AdminWelcome = () => {
  const [code, setCode] = useState();
  const nav = useNavigate();

  if (code === "BarroFamily") {
    nav("/admin-panel");
  }

  return (
    <div className="adminWelcome">
      <div className="contents">
        <img src={kuyajher} alt="" />
        <input
          onChange={(e) => setCode(e.target.value)}
          type="password"
          placeholder="Enter Code"
        />
      </div>
    </div>
  );
};

export default AdminWelcome;

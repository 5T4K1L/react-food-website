import React from "react";
import "../styles/AdminPanel.css";
import AdminNavbar from "../components/AdminNavbar";

const AdminPanel = () => {
  return (
    <div className="adminPanel">
      <AdminNavbar></AdminNavbar>
      <div className="contents">
        <a href="/manage-products">
          <button>Manage Products</button>
        </a>
        <a>
          <button>Manage Categories</button>
        </a>
        <a href="/orders">
          <button>Manage Orders</button>
        </a>
      </div>
    </div>
  );
};

export default AdminPanel;

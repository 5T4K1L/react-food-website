import React, { useState } from "react";
import Homepage from "./pages/Homepage";
import Products from "./pages/Products";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductView from "./pages/ProductView";
import Cart from "./pages/Cart";
import Menu from "./pages/Menu";
import CategoryView from "./pages/CategoryView";
import CheckoutPage from "./pages/CheckoutPage";
import AdminPanel from "./pages/AdminPanel";
import ManageProducts from "./pages/ManageProducts";
import EditProduct from "./pages/EditProduct";
import AddProduct from "./pages/AddProduct";
import ManageOrders from "./pages/ManageOrders";
import UserOrder from "./pages/UserOrder";
import { auth } from "./firebase";
import { onAuthStateChanged, signInAnonymously } from "firebase/auth";
import ManageCategories from "./pages/ManageCategories";
import AddCategory from "./pages/AddCategory";
import PrivacyPolicy from "./pages/PrivacyPolicy";

const App = () => {
  const [currentUser, setUser] = useState();
  onAuthStateChanged(auth, (user) => {
    setUser(user);
  });

  const handleLogin = async () => {
    signInAnonymously(auth);
  };

  return (
    <div className="homepageContainer">
      {currentUser ? (
        <BrowserRouter>
          <Routes>
            <Route index element={<Homepage />} />
            <Route path="/products" element={<Products />} />

            <Route path="/view-product/:productId" element={<ProductView />} />
            <Route path="/category/:category" element={<CategoryView />} />

            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<CheckoutPage />} />

            <Route path="/menu" element={<Menu />} />

            <Route path="/admin-panel" element={<AdminPanel />} />
            <Route path="/manage-products" element={<ManageProducts />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/edit/:productName" element={<EditProduct />} />

            <Route path="/orders" element={<ManageOrders />} />
            <Route path="/orders/:user" element={<UserOrder />} />

            <Route path="/manage-categories" element={<ManageCategories />} />
            <Route path="/add-category" element={<AddCategory />} />

            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          </Routes>
        </BrowserRouter>
      ) : (
        <div className="loginAsGuest">
          <h1>Kuya Jher</h1>
          <button onClick={handleLogin}>Login as Guest</button>
        </div>
      )}
    </div>
  );
};

export default App;

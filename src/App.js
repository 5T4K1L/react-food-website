import React, { useEffect } from "react";
import Homepage from "./pages/Homepage";
import Products from "./pages/Products";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductView from "./pages/ProductView";
import Cart from "./pages/Cart";
import { onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { auth } from "./firebase";
import Menu from "./pages/Menu";
import CategoryView from "./pages/CategoryView";
import CheckoutPage from "./pages/CheckoutPage";
import AdminWelcome from "./pages/AdminWelcome";
import AdminPanel from "./pages/AdminPanel";
import ManageProducts from "./pages/ManageProducts";
import EditProduct from "./pages/EditProduct";
import AddProduct from "./pages/AddProduct";

const App = () => {
  document.title = "Kuya Jher";
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("Logged in Anonymously");
      } else {
        signInAnonymously(auth);
      }
    });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="/products" element={<Products />} />

        <Route path="/view-product/:productId" element={<ProductView />} />
        <Route path="/category/:category" element={<CategoryView />} />

        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<CheckoutPage />} />

        <Route path="/menu" element={<Menu />} />

        <Route path="/admin" element={<AdminWelcome />} />
        <Route path="/admin-panel" element={<AdminPanel />} />
        <Route path="/manage-products" element={<ManageProducts />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/edit/:productName" element={<EditProduct />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

import React from "react";
import Homepage from "./pages/Homepage";
import Products from "./pages/Products";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductView from "./pages/ProductView";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/view-product/:productId" element={<ProductView />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

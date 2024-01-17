import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/Products.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import { debounce } from "lodash";
import { Helmet } from "react-helmet";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const debouncedSearch = debounce((value) => {
    setSearch(value);
  }, 10);

  useEffect(() => {
    const getAllProducts = async () => {
      const data = await getDocs(collection(db, "products"));
      setProducts(
        data.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    };

    getAllProducts();
  }, []);
  return (
    <div className="productContainer">
      <Helmet>
        <meta name="google-adsense-account" content="ca-pub-9490464779487082" />
      </Helmet>
      <Navbar />
      <div className="searchContainer">
        <form action="">
          <input
            onChange={(e) => debouncedSearch(e.target.value)}
            type="text"
            placeholder="Search"
          />
        </form>
      </div>

      <div className="allProducts">
        <div className="header">
          <p>All Products</p>
        </div>

        <div className="allproducts">
          <div className="productsParent">
            {products
              .filter((prod) =>
                prod.product_name.toLowerCase().includes(search)
              )
              .map((product) => (
                <div key={product.id}>
                  <Link to={`/view-product/${product.id}`}>
                    <div className="product">
                      <img src={product.photoURL} alt="" />
                      <p className="name">
                        {product.product_name
                          .split(" ") // Split the name into an array of words
                          .slice(0, 2) // Keep only the first two words
                          .join(" ") +
                          (product.product_name.split(" ").length > 2
                            ? ""
                            : "")}
                      </p>
                      <p className="price">
                        Php {product.sizes[0].match(/Php (\d+)/)[1]}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;

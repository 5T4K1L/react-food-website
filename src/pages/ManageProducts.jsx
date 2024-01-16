import React, { useEffect, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import "../styles/Cart.css";
import "../styles/Manage.css";
import { debounce } from "lodash";
import add from "../svgs/add-circle-svgrepo-com(1).svg";

const ManageProducts = () => {
  const [product, setProduct] = useState([]);
  const [search, setSearch] = useState("");

  const debouncedSearch = debounce((value) => {
    setSearch(value);
  }, 10);

  useEffect(() => {
    const getProducts = async () => {
      const data = await getDocs(collection(db, "products"));
      setProduct(
        data.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    };
    getProducts();
  }, []);

  const deleteProduct = async (productID) => {
    await deleteDoc(doc(db, "products", productID));
    window.location.reload();
  };

  return (
    <div className="manageProducts">
      <AdminNavbar />
      <div className="searchContainer manageSearch">
        <form action="">
          <input
            onChange={(e) => debouncedSearch(e.target.value)}
            type="text"
            placeholder="Search"
          />
        </form>
        <a href="/add-product">
          <button>
            <img src={add} alt="" />
          </button>
        </a>
      </div>

      <div className="productsContainer">
        {product
          .filter((prod) => prod.product_name.toLowerCase().includes(search))
          .map((prod, index) => (
            <div className="productContent" key={index}>
              <div className="two">
                <div className="cartImage">
                  <img src={prod.photoURL} alt="" />
                </div>
                <div className="productEditDelete">
                  <p>{prod.product_name}</p>
                  <div className="buttons">
                    <a href={`/edit/${prod.product_name}`}>
                      <button className="edit">Edit</button>
                    </a>
                    <button
                      onClick={() => deleteProduct(prod.id)}
                      className="deleteCart"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ManageProducts;

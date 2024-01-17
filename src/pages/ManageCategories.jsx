import React, { useEffect, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import "../styles/Cart.css";
import "../styles/Manage.css";
import { debounce } from "lodash";
import add from "../svgs/add-circle-svgrepo-com(1).svg";
import "../styles/ManageCategories.css";

const ManageCategories = () => {
  const [category, setCategory] = useState([]);
  const [search, setSearch] = useState("");

  const debouncedSearch = debounce((value) => {
    setSearch(value);
  }, 10);

  useEffect(() => {
    const getCategory = async () => {
      const data = await getDocs(collection(db, "category"));
      setCategory(
        data.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    };
    getCategory();
  }, []);

  const handleDelete = async (catID) => {
    await deleteDoc(doc(db, "category", catID));
    window.location.reload();
  };

  return (
    <div className="manageCategories">
      <AdminNavbar />
      <div className="searchContainer manageSearch">
        <form action="">
          <input
            onChange={(e) => debouncedSearch(e.target.value)}
            type="text"
            placeholder="Search"
          />
        </form>
        <a href="/add-category">
          <button>
            <img src={add} alt="" />
          </button>
        </a>
      </div>

      <div className="categories">
        {category
          .filter((cate) => cate.category.toLowerCase().includes(search))
          .map((cat) => (
            <div className="cats">
              <p>{cat.category}</p>
              <p onClick={() => handleDelete(cat.id)}>Delete</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ManageCategories;

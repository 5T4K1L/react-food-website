import React from "react";
import search from "../svgs/search-alt-svgrepo-com.svg";
import "../styles/Search.css";

const Search = () => {
  return (
    <div className="searchContainer">
      <form action="">
        <input type="text" placeholder="Search" />
        <button>
          <img src={search} alt="" />
        </button>
      </form>
    </div>
  );
};

export default Search;

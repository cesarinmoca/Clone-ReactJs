import React from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

const CustomSearchItem = ({ id, name, clearSearch, movie, image }) => {
  const navigate = useNavigate();
  return (
    <div
      className="containerSearch"
      onClick={() => {
        navigate(`/about/${id}`, { state: movie });
        clearSearch();
      }}
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.7)",  // Darken the background for each search result item
        color: "#fff",  // Keep the text color white
        borderBottom: "1px solid #444",  // Optionally add a border between search items
      }}
    >
      <img alt={name} src={image} width={"60px"} height="50px" />
      {" - "}
      {name}
    </div>
  );
};

export default CustomSearchItem;

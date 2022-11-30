import { Image } from "@mui/icons-material";
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
    >
      <img alt={name} src={image} width={"60px"} height="50px" />
      {" - "}
      {name}
    </div>
  );
};

export default CustomSearchItem;

import React from "react";
import "./categories.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToFilter } from "../redux/Filtered";

function Categories() {
  const navigate = useNavigate();
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const handleClick = (category) => {
    const filter = products?.filter((item) => item.category == category);
    dispatch(addToFilter(filter));
    navigate("/category");
  };
  return (
    <div className="categories">
      <span onClick={() => handleClick("clothing")}>Clothing and Apparel</span>
      <span onClick={() => handleClick("electronics")}>Electronics</span>
      <span onClick={() => handleClick("home-furniture")}>
        Home and Furniture
      </span>
      <span onClick={() => handleClick("books-media")}>Books and media</span>
      <span onClick={() => handleClick("sports")}>Sports and outdoor</span>
      <span onClick={() => handleClick("health-wellness")}>
        Grocies and food
      </span>
      <span onClick={() => handleClick("beauty-care")}>
        Beauty and Personal Care
      </span>
      <span onClick={() => handleClick("pet-supplies")}>Pet Supplies</span>
    </div>
  );
}

export default Categories;

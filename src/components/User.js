import React from "react";
import "./user.css";
import { useSelector, useDispatch } from "react-redux";
import { removeUser } from "../redux/userSlice";
import { CloseCircleFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

function User() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handlelogout = () => {
    dispatch(removeUser());
    console.log("click");
  };
  const navigateWishlist = () => {
    if (user) {
      navigate(`/wishlist/${user._id}`);
    } else {
      console.log("login in add add products");
    }
  };
  const toOrder = () => {
    navigate(`order/${user._id}`);
  };
  return (
    <div className="user">
      <h2 className="user-name">Hello,{user?.name}</h2>
      <div className="order-wishlist-div">
        <button onClick={navigateWishlist}>Wishlist</button>
        <button onClick={toOrder}>Orders</button>
      </div>
      <button onClick={handlelogout} className="user-logout-btn">
        Logout
      </button>
      <button className="sell-products">Sell your products</button>
      <CloseCircleFilled className="user-icon" />
    </div>
  );
}

export default User;

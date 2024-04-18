import { CheckCircleOutlined } from "@ant-design/icons";
import React from "react";
import "./orderplaced.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function OrderPlaced() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const handleorder = () => {
    navigate(`/order/${user._id}`);
  };
  return (
    <div className="order-placed-wrapper">
      <CheckCircleOutlined className="check-icon" />
      <div className="text-order-placed">
        <h4>Congratulations order placed.</h4>
        <button onClick={handleorder}>visit orders</button>
      </div>
    </div>
  );
}

export default OrderPlaced;

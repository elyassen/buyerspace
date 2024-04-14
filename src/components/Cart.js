import React, { useEffect, useState } from "react";
import "./cart.css";
import { useSelector } from "react-redux";
import SearchProducts from "./SearchProducts";
import { useNavigate } from "react-router-dom";

function Cart() {
  const cart = useSelector((state) => state.cart);
  const [product, setProduct] = useState(cart);
  const [total, setTotal] = useState(0);
  const user = useSelector((state) => state.user);

  const navigate = useNavigate();
  const calculateTotal = (product) => {
    return product.reduce((total, item) => total + item.price, 0);
  };
  useEffect(() => {
    const totalprice = calculateTotal(product);
    setTotal(totalprice);
  }, [product]);
  const toSignup = () => {
    navigate("/login-signup");
  };
  const placeOrder = async () => {
    const productIds = product.map((item) => item._id);
    try {
      const req = await fetch("http://localhost:3001/order", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          productId: productIds,
          customerId: user._id,
        }),
      });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="cart">
      <div className="cart-l">
        <div className="cart-l-heading">
          <h3>Shopping Cart</h3>
          <h4>total items: {product.length}</h4>
          <h4 className="price">price</h4>
        </div>
        <div className="cart-items">
          {product?.map((product) => (
            <div key={product._id} className="cart-flex">
              <div className="cart-img-div">
                <img src={product.images[0]} alt="" />
              </div>
              <div className="cart-des">
                <h1 className="cart-title">{product.title}</h1>
                <p>In stock</p>
                <h5>quantity</h5>
                <button className="cart-del">Delete</button>
              </div>
              <h1 className="cart-price">Rs:{product.price}</h1>
            </div>
          ))}
        </div>
      </div>
      <div className="cart-r">
        {user.name ? (
          <div className="user-cart">
            <h1>{user.name}</h1>
            <h3>{user.email}</h3>
            <h3>{user.phone}</h3>
            <p>{user.address}</p>
            <h4>Total price: Rs {total}</h4>
            <button onClick={placeOrder} className="place-order">
              Place order
            </button>
          </div>
        ) : (
          <button onClick={toSignup}>please login</button>
        )}
      </div>
    </div>
  );
}

export default Cart;

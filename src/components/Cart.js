import React, { useEffect, useState } from "react";
import "./cart.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/utils";
import { emptyCart, removefromCart } from "../redux/cartSlice";
import OrderPlaced from "./OrderPlaced";

function Cart() {
  const cart = useSelector((state) => state.cart);
  const [total, setTotal] = useState(0);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const navigate = useNavigate();

  // Calculate total price when cart changes
  useEffect(() => {
    const totalprice = cart.reduce((total, item) => total + item.price, 0);
    setTotal(totalprice);
  }, [cart]);

  const toSignup = () => {
    navigate("/login-signup");
  };

  const placeOrder = async () => {
    const productIds = cart.map((item) => item._id);
    try {
      const req = await fetch(`${BASE_URL}/order`, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          productId: productIds,
          customerId: user._id,
        }),
      });
      if (req.ok) {
        const res = await req.json();
        if (res.status === "success") {
          console.log("empty cart ");
          setOrderPlaced(true);
          dispatch(emptyCart());
          setTimeout(() => {
            setOrderPlaced(false);
          }, 6000);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  const removeCart = (product) => {
    dispatch(removefromCart(product._id));
  };

  return (
    <div className="cart">
      <div className="cart-l">
        <div className="cart-l-heading">
          <h3>Shopping Cart</h3>
          <h4>total items: {cart.length}</h4>
          <h4 className="price">price</h4>
        </div>
        <div className="cart-items">
          {cart?.map((product) => (
            <div key={product._id} className="cart-flex">
              <div className="cart-img-div">
                <img src={product.images[0]} alt="" />
              </div>
              <div className="cart-des">
                <h1 className="cart-title">{product.title}</h1>
                <p>In stock</p>
                <h5>quantity</h5>
                <button
                  onClick={() => removeCart(product)}
                  className="cart-del"
                >
                  Delete
                </button>
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
            {cart.length > 0 && (
              <button onClick={placeOrder} className="place-order">
                Place order
              </button>
            )}
          </div>
        ) : (
          <button className="cart-signin" onClick={toSignup}>
            Please login
          </button>
        )}
      </div>
      {orderPlaced && (
        <div className="order-placed">
          <OrderPlaced />
        </div>
      )}
    </div>
  );
}

export default Cart;

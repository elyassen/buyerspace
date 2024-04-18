import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../utils/utils";
import "./order.css";

function Order() {
  const { id } = useParams();
  const [orders, setOrders] = useState([]);
  const [productDetails, setProductDetails] = useState([]);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const orderData = await getProduct("order", id);
        if (orderData && orderData.length > 0) {
          setOrders(orderData);

          const productPromises = orderData.map((order) =>
            Promise.all(
              order.productId.map((productId) =>
                getProduct("productdes", productId)
              )
            )
          );
          const resolvedProductPromises = await Promise.all(productPromises);
          setProductDetails(resolvedProductPromises);
          setFetched(true);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrderDetails();
  }, [id]);

  return (
    <div className="order-wrapper">
      <h1 className="order-heading">
        My Orders <p className="order-sub">Manage yor orders</p>
      </h1>
      {!fetched ? (
        <h1 className="loading"></h1>
      ) : (
        <>
          {orders.map((order, index) => (
            <div key={index}>
              <h3 className="order-1">Order {index + 1}</h3>
              {/* <p>Customer ID: {order.customerId}</p> */}
              {/* <h4>Products:</h4> */}
              <ul>
                {productDetails[index] &&
                  productDetails[index].map((product, idx) => (
                    <div className="order-flex" key={idx}>
                      <div className="img-div-order">
                        <img src={product.images[0]} alt="" />
                      </div>
                      <h1 className="title-order">{product.title}</h1>
                      <div className="order-status">
                        <h4>Status</h4>
                        <h5>Pending</h5>
                      </div>
                    </div>
                  ))}
              </ul>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default Order;

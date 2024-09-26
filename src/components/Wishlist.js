import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL, getProduct } from "../utils/utils";
import "./wishlist.css";
import { CloseCircleFilled } from "@ant-design/icons";

function Wishlist() {
  const { id } = useParams();
  const [wishlist, setWishlist] = useState([]);
  useEffect(() => {
    getdata();
  }, []);
  const getdata = async () => {
    const res = await getProduct("wishlist", id);
    res.map(async (item) => {
      getProduct("productdes", item.productId).then((res) =>
        setWishlist((pre) => [...pre, res])
      );
    });
  };
  const removeWishlist = async (product) => {
    const req = await fetch(`${BASE_URL}/wishlist/${id}`, {
      method: "delete",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ productId: product._id }),
    });
    if (req.status == 200) {
      console.log("deleted formwishlist");
      setWishlist([]);
      getdata();
    }
  };
  console.log(wishlist);
  return (
    <div className="wishlist-wrapper">
      <div className="wishlist-header">
        <h1> Wishlist</h1>
        <h1>{wishlist.length} Items</h1>
      </div>
      <div className="product-wrapper-wishlist">
        {wishlist?.map((product) => {
          return (
            <div className="wishlist-product">
              <div className="img-div-wishlist">
                <img src={product.images[0]} />
              </div>
              <h1 className="wishlist-title">
                {product.title.substring(0, 50)}
              </h1>
              <button  onClick={() => removeWishlist(product)} className="wish-add-btn">Add to cart</button>
              <button
                onClick={() => removeWishlist(product)}
                className="remove-wish"
              >
                <CloseCircleFilled />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Wishlist;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../utils/utils";
import "./wishlist.css";
import SearchProducts from "./SearchProducts";

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
    const req = await fetch(`http://localhost:3001/wishlist/${id}`, {
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
  return (
    <div className="found">
      {wishlist?.map((product) => (
        <div
          key={product._id}
          className="search-product-list"
          id="wish-product"
        >
          <SearchProducts product={product} />
          <div className="wish-btns">
            <button className="wish-add">Add to cart</button>
            <button
              className="wish-remove"
              onClick={() => removeWishlist(product)}
            >
              Remove from cart
            </button>
          </div>
          <div className="overlay"></div>
        </div>
      ))}
    </div>
  );
}

export default Wishlist;

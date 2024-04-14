import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../redux/productSlice";
import "./product.css";
import { HeartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { addtocart } from "../redux/cartSlice";
import { handleCat, handleWishlist } from "../utils/utils";
import { addToFilter } from "../redux/Filtered";

function Products() {
  const [wishlist, setWishlist] = useState(false);
  const [products, setProducts] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    async function getProducts() {
      const req = await fetch("http://localhost:3001/products");
      const res = await req.json();
      setProducts(res);
      dispatch(addProduct(res));
    }
    getProducts();
  }, []);
  const handleproduct = (product) => {
    navigate(`/product-description/${product._id}`);
    handleCat(product.category);
  };
  const handleCat = (category) => {
    const filter = products?.filter((item) => item.category == category);
    dispatch(addToFilter(filter));
  };

  const tocart = (e) => {
    dispatch(addtocart(e));
  };
  const handlewishlist = (product) => {
    const data = { productId: product._id, customerId: user._id };
    if (user._id) {
      handleWishlist(data);
    } else {
      console.log("login in");
    }
  };
  return (
    <div className="product-wrapper">
      {products?.map((product) => {
        return (
          <div key={product._id} className="product" loading="lazy">
            <div className="img-div">
              {" "}
              <img
                onClick={() => handleproduct(product)}
                className="product-img"
                src={product.images[0]}
                alt=""
              />
            </div>
            <div className="product-details">
              <div className="detail-top">
                <h4 className="title">
                  {product.title.substring(0, 60)}{" "}
                  {product.title.length > 72 && <span>...</span>}
                </h4>
                <h6 className="category-product-detail">{product.category}</h6>
                <h4 className="price">Rs {product.price}</h4>
              </div>
              <div className="button-div">
                <button onClick={() => tocart(product)} className="add-to-cart">
                  Add to cart
                </button>
                <button
                  onClick={() => handlewishlist(product)}
                  className={`${wishlist ? "red-heart" : ""}heart`}
                >
                  <HeartOutlined />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Products;

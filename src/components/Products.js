import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../redux/productSlice";
import "./product.css";
import { HeartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { addtocart } from "../redux/cartSlice";
import { BASE_URL, handleCat, handleWishlist } from "../utils/utils";
import { addToFilter } from "../redux/Filtered";

function Products() {
  const [wishlist, setWishlist] = useState(false);
  const [product, setProducts] = useState();
  const productFromStore = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    async function getProducts() {
      if (productFromStore.length === 0) {
        const req = await fetch(`${BASE_URL}/products`);
        const res = await req.json();
        setProducts(res);
        dispatch(addProduct(res));
      } else {
        setProducts(productFromStore);
      }
    }
    getProducts();
  }, []);
  const handleproduct = (product) => {
    navigate(`/product-description/${product._id}`);
    handleCat(product.category);
  };
  const handleCat = (category) => {
    const filter = product?.filter((item) => item.category == category);
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
      {product ? (
        product?.map((product) => {
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
                <div
                  className="detail-top"
                  onClick={() => handleproduct(product)}
                >
                  <h4 className="title">
                    {product.title.substring(0, 60)}{" "}
                    {product.title.length > 72 && <span>...</span>}
                  </h4>
                  <h6 className="category-product-detail">
                    {product.category}
                  </h6>
                  <h4 className="price">Rs {product.price}</h4>
                </div>
                <div className="button-div">
                  <button
                    onClick={() => tocart(product)}
                    className="add-to-cart"
                  >
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
        })
      ) : (
        <div className="loading"></div>
      )}
    </div>
  );
}

export default Products;

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL, getProduct } from "../utils/utils";
import { useSelector, useDispatch } from "react-redux";
import "./productdes.css";
import { addToFilter } from "../redux/Filtered";
import { addtocart } from "../redux/cartSlice";
import { CheckCircleFilled } from "@ant-design/icons";

function ProductDescription() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const filter = useSelector((state) => state.filtered);
  const [similar, setSimilar] = useState();
  const dispatch = useDispatch();
  const [addModel, setAddModel] = useState(false);

  const [description, setDescription] = useState(null);
  const products = useSelector((state) => state.products);
  var data;
  if (user) {
    data = { productId: id, customerId: user._id };
  }
  useEffect(() => {
    setAddModel(false);
    if (products.length == 0) {
      window.scrollTo(0, 0);
      getProduct("productdes", id).then((res) => {
        setDescription(res);
        console.log(res);
        handleCat(res.category);
      });
    } else {
      window.scrollTo(0, 0);
      const foundDes = products.filter((pro) => {
        return pro._id === id;
      });
      setDescription(foundDes[0]);
      handleCat(foundDes[0].category);
      window.scrollTo(0, 0);
    }
  }, [id]);
  const handleWishlist = async () => {
    if (user._id) {
      try {
        const req = await fetch(`${BASE_URL}/wishlist`, {
          method: "post",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const res = await req.json();
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log("please login ");
    }
  };

  const handleproduct = (product) => {
    navigate(`/product-description/${product._id}`);
    handleCat(product.category);
  };
  const handleCat = (category) => {
    const filter = products?.filter((item) => item.category == category);
    console.log(" from backned filter", category, filter);
    dispatch(addToFilter(filter));
    setSimilar(filter);
  };
  const addcart = () => {
    dispatch(addtocart(description));
    setAddModel(true);
    setTimeout(() => {
      setAddModel(false);
    }, 3000);
  };
  const tocart = () => {
    navigate("/cart");
  };

  return (
    <div className="descrition">
      <div className="description-wrapper">
        <div className="des-l">
          <img src={description?.images[0]} alt="" />
        </div>
        <div className="des-c">
          <h1>{description?.title}</h1>
          <h1 className="price-des">Rs {description?.price}</h1>
          <p>{description?.description}</p>
          <button className="prodes-btn">Buy now</button>
        </div>
        <div className="des-r">
          <button className="des-wish-btn" onClick={handleWishlist}>
            Add to wishlist
          </button>
          <button onClick={addcart} className="des-add-btn">
            Add to cart
          </button>
        </div>
      </div>
      <h1 className="similar-heading">Similar products</h1>
      <div className="similar">
        {similar?.map((pro) => (
          <div
            onClick={() => handleproduct(pro)}
            key={pro._id}
            className="similar-items"
          >
            <img src={pro.images[0]} alt="" />
            <h4>{pro.title.substring(0, 12)}</h4>
          </div>
        ))}
      </div>
      {addModel && (
        <div className="add-model">
          <CheckCircleFilled className="add-model-icon" />
          <h3>Added to cart</h3>
          <button className="tocart-btn" onClick={tocart}>
            View cart
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductDescription;

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProduct } from "../utils/utils";
import { useSelector, useDispatch } from "react-redux";
import "./productdes.css";
import { addToFilter } from "../redux/Filtered";

function ProductDescription() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const filter = useSelector((state) => state.filtered);
  const [similar, setSimilar] = useState();
  const dispatch = useDispatch();

  console.log(user._id);
  const [description, setDescription] = useState(null);
  const products = useSelector((state) => state.products);
  const data = { productId: id, customerId: user._id };
  console.log(data);
  useEffect(() => {
    getProduct("productdes", id).then((res) => setDescription(res));
    setSimilar(filter);
    window.scrollTo(0, 0);
  }, [id]);
  const handleWishlist = async () => {
    if (user._id) {
      try {
        const req = await fetch("http://localhost:3001/wishlist", {
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
    dispatch(addToFilter(filter));
  };

  return (
    <div className="descrition">
      <div className="description-wrapper">
        <div className="des-l">
          <img src={description?.images[0]} alt="" />
        </div>
        <div className="des-c">
          <h1>{description?.title}</h1>
          <h1>Rs {description?.price}</h1>
          <p>{description?.description}</p>
          <button className="prodes-btn">Buy now</button>
        </div>
        <div className="des-r">
          <button onClick={handleWishlist}>Add to wishlist</button>
          <button>Add to cart</button>
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
    </div>
  );
}

export default ProductDescription;

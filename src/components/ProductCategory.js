import React from "react";
import { useSelector } from "react-redux";
import SearchProducts from "./SearchProducts";
import "./productcat.css";
import { useNavigate } from "react-router-dom";
function ProductCategory() {
  const filter = useSelector((state) => state.filtered);
  const flat = filter.flat();
  const navigate = useNavigate();
  const handleclick = (item) => {
    navigate(`/product-description/${item._id}`);
  };
  return (
    <div id="product-cate">
      <h1 className="category-title">{filter[0]?.category}</h1>
      <p className="cat-length">{filter?.length} listed</p>
      <div className="found" id="found-cat">
        {filter?.map((product) => {
          return (
            <div
              key={product._id}
              onClick={() => handleclick(product)}
              className="search-product-list"
              id="search-product"
            >
              <SearchProducts product={product} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProductCategory;

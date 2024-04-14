import React from "react";
import "./searchproduct.css";

function SearchProducts({ product }) {
  return (
    <>
      <div className="img-div-search" id="img-div-cat">
        <img
          className="search-img"
          id="product-img-cat"
          src={product.images[0]}
          alt="product img"
        />
      </div>

      <h4 className="search-title">{product.title.substring(0, 70)}</h4>
      <h3 className="search-price">Rs:{product.price}</h3>
    </>
  );
}

export default SearchProducts;

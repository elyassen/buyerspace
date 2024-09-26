import React, { useState } from "react";
import "./header.css";
import {
  CloseOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import SearchProducts from "./SearchProducts";
import { useNavigate } from "react-router-dom";
import User from "./User";
function Header() {
  const [search, setSearch] = useState(false);
  const cart = useSelector((state)=>state.cart)
  
  const [searchInput, setSearchInput] = useState("");
  const [found, setFound] = useState([]);
  const [showUser, setShowUser] = useState(false);
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.user);
  const products = useSelector((state) => state.products);

  const handlesearch = (e) => {
    const toSearch = e.target.value;
    setSearchInput(e.target.value);
    const foundItems = products?.filter((item) =>
      item.title.toLowerCase().includes(toSearch.toLowerCase())
    );

    setFound(foundItems);
  };

  const clearSearch = () => {
    setSearchInput("");
  };
  const handleclick = () => {
    navigate("/");
  };
  const handlecart = () => {
    navigate("/cart");
  };
  const productdes = (item) => {
    navigate(`/product-description/${item._id}`);
    setSearchInput("");
    setSearch(false);
  };
  const handleUser = () => {
    if (!userInfo?.name) {
      navigate("/login-signup");
    } else {
      setShowUser(!showUser);
    }
  };
  return (
    <div className="header-wrapper">
      <div className="header">
        <h3 onClick={handleclick}>"Logo"</h3>

        <div className="right-header">
          <div onClick={handleUser} className="header-icons user-wrapper">
            <UserOutlined />
            {showUser && <User />}
          </div>
          <div onClick={() => setSearch(!search)} className="header-icons" >
            <SearchOutlined />
          </div>
          <div onClick={handlecart} className="header-icons " id="cart-icon-header">
            <ShoppingCartOutlined />
            {cart.length>0 && <span className="cart-length-header">{cart.length}</span>}
          </div>
          <div className="become-seller">Become a seller</div>
        </div>
      </div>
      {search && (
        <div className="search-wrapper">
          <div className="search">
            <SearchOutlined className="header-icons" />
            <input
              type="text"
              onChange={handlesearch}
              value={searchInput || ""}
            />
            <CloseOutlined className="header-icons" onClick={clearSearch} />
          </div>
          {searchInput?.length > 0 &&
            (found.length > 0 ? (
              <div className="found">
                <h1 className="length">{found.length} Products found</h1>
                {found.map((item) => {
                  return (
                    <div
                      onClick={() => productdes(item)}
                      key={item._id}
                      className="search-product-list"
                    >
                      <SearchProducts product={item} />
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="found-default">0 items found</div>
            ))}
        </div>
      )}
    </div>
  );
}

export default Header;

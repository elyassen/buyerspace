import "./App.css";
import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import ProductCategory from "./components/ProductCategory";
import Cart from "./components/Cart";
import ProductDescription from "./components/ProductDescription";
import Signup from "./components/Signup";
import Wishlist from "./components/Wishlist";
import Order from "./components/Order";
import { BASE_URL } from "./utils/utils";
import { useEffect } from "react";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/category" element={<ProductCategory />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route
            path="/product-description/:id"
            element={<ProductDescription />}
          ></Route>
          <Route path="/login-signup" element={<Signup />} />
          <Route path="/wishlist/:id" element={<Wishlist />} />
          <Route path="/order/:id" element={<Order />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

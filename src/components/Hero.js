import React from "react";
import "./hero.css";

function Hero() {
  return (
    <div className="hero">
      <img
        className="hero-img"
        src={require("../static/backdrop_men.webp")}
        alt=""
      />
      <h3 className="hero-heading">Explore Clothing</h3>
      <div className="overlay"></div>
    </div>
  );
}

export default Hero;

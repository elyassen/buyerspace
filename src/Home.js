import React, { Suspense, useEffect } from "react";
import Categories from "./components/Categories";
import Header from "./components/Header";
import { BASE_URL } from "./utils/utils";
// const Products = React.lazy(() => import("./components/Products"));
import Products from "./components/Products";
function Home() {
  useEffect(() => {
    async function startServer() {
      const req = await fetch(`${BASE_URL}/`);
    }
    startServer();
  }, []);
  return (
    <>
      <Categories />
      <Products />
    </>
  );
}

export default Home;

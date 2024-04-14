import React, { Suspense } from "react";
import Categories from "./components/Categories";
import Header from "./components/Header";
const Products = React.lazy(() => import("./components/Products"));

function Home() {
  return (
    <>
      {/* <Header /> */}

      <Categories />
      <Suspense fallback={<div className="loading"></div>}>
        <Products />
      </Suspense>
    </>
  );
}

export default Home;

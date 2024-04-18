import React, { Suspense, useEffect } from "react";
import Categories from "./components/Categories";
import Header from "./components/Header";
import { BASE_URL } from "./utils/utils";
const Products = React.lazy(() => import("./components/Products"));

function Home() {
  useEffect(() => {
    async function startServer() {
      const req = await fetch(`${BASE_URL}/`);
      console.log(req);
      const res = await req.json();
      console.log(res);
    }
    startServer();
  }, []);
  return (
    <>
      {/* <Header /> */}

      <Categories />
      <Suspense fallback={<div>products</div>}>
        <Products />
      </Suspense>
    </>
  );
}

export default Home;

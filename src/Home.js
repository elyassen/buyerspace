import React, { useEffect, useState } from "react";
import Categories from "./components/Categories";
import Header from "./components/Header";
import { BASE_URL } from "./utils/utils";
import Products from "./components/Products";
import { useSelector } from "react-redux";
function Home() {
  const [Server, setServer] = useState(true);
  const products = useSelector((state) => state.products);
  useEffect(() => {
    async function startServer() {
      const req = await fetch(`${BASE_URL}/`);
      const res = await req.json();
      if (res.status === "true") {
        setServer(true);
      }
    }
    if (products.length == 0) {
      setServer(false);
      startServer();
    } else {
      setServer(true);
    }
  }, []);
  return (
    <>
      {Server ? (
        <>
          <Categories />
          <Products />
        </>
      ) : (
        <div className="server-start-div">
          <h2>
            Server inactive
          </h2>
          <p> We appreciate your patience as our server is currently inactive. 
    It typically takes around 50 seconds for the server to fully activate and become operational. During this time, essential processes are being initialized to ensure a seamless experience for you once it's ready.</p>
          <div className="loading-server"></div>
          
        </div>
      )}
    </>
  );
}

export default Home;

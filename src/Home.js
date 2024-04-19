import React, { useEffect, useState } from "react";
import Categories from "./components/Categories";
import Header from "./components/Header";
import { BASE_URL } from "./utils/utils";
import Products from "./components/Products";
import { CloseCircleFilled } from "@ant-design/icons";
function Home() {
  const [Server, setServer] = useState(false);
  useEffect(() => {
    async function startServer() {
      const req = await fetch(`${BASE_URL}/`);
      const res = await req.json();
      console.log(res);
      if (res.status === "true") {
        setServer(true);
      }
    }
    startServer();
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
            Server inactive. Activating shortly. Hosted on Render free-tier
          </h2>
          <div className="loading-server"></div>
          <p>please wait..</p>
        </div>
      )}
    </>
  );
}

export default Home;

import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./ui/nav.tsx";
import Footer from "./ui/footer.tsx";

const LayOut = () => {
  return (
    <>
      <Header />
      <div className="pt-[10vh] pb-[10vh]">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default LayOut;

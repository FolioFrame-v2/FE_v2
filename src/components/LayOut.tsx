import React from "react";
import { Outlet } from "@tanstack/react-router";
import Header from "@/components/ui/nav.tsx";
import Footer from "@/components/ui/footer.tsx";

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

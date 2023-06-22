import React from "react";
import Navbar from "../Shared/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Shared/Footer";

const LayOut = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-[calc(100vh-100px)]">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default LayOut;

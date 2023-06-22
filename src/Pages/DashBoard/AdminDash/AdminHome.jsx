import React from 'react';
import { Helmet } from 'react-helmet-async';
import Lottie from "lottie-react";
import welcome from "/public/animations/welcome-anim.json";

const AdminHome = () => {
    return (
      <div>
        <Helmet>Melody Masters | Instractor Home</Helmet>
        <div className="text-center lg:text-left">
          <Lottie animationData={welcome} className="" loop={true} />
        </div>
      </div>
    );
};

export default AdminHome;
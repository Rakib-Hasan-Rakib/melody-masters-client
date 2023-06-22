import React from 'react';
import { Helmet } from 'react-helmet-async';
import Lottie from "lottie-react";
import welcome from "/public/animations/welcome-anim.json";

const StudentHome = () => {
    return (
      <div>
        <Helmet>Melody Masters | Student Home</Helmet>
        <div className="text-center lg:text-left">
          <Lottie animationData={welcome} className="" loop={true} />
        </div>
      </div>
    );
};

export default StudentHome;
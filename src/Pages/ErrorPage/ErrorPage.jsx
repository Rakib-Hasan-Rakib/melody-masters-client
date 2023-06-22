import React from "react";
import Lottie from "lottie-react";
import errorAnimation from "/public/animations/error-anim.json";
import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  let { status, statusText, data } = useRouteError();
  return (
    <div>
      <div className="w-1/5 mx-auto">
        <Lottie animationData={errorAnimation} loop={true} />
      </div>
      <div className="text-center text-red-600 flex flex-col gap-2">
        <h1 className="font-bold text-3xl md:text-7xl">{status}</h1>
        <p className="font-semibold text-xl md:text-3xl">{statusText}</p>
        <p className="font-semibold text-lg md:text-2xl">{data}</p>
      </div>
      <div className="flex justify-center items-center">
        <button className=" my-8">
          <Link to="/" className="custom-btn">
            Back To Home
          </Link>
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;

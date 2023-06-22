import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { Fade } from "react-awesome-reveal";


const PopularClasses = () => {
  const [axiosSecure] = useAxiosSecure();

  const { data: approvedClasses = [] } = useQuery(
    ["approvedClasses"],
    async () => {
      const res = await axiosSecure.get("/approvedClasses");
      return res.data;
    }
  );
  return (
    <div>
      <Fade delay={1e2} cascade damping={1e-1}>
        <h2 className="section-title">popular classes of our instractors</h2>
      </Fade>

      <div className="grid md:grid-cols-3 gap-8 my-8 md:my-12">
        {approvedClasses?.slice(0, 6).map((approvedClass, i) => {
          return (
            <div
              key={i}
              className="card card-compact bg-base-100 shadow-xl border border-cyan-700 space-y-3"
            >
              <figure>
                <img
                  className="w-full h-[300px] object-cover"
                  src={approvedClass.photoUrl}
                  alt="Shoes"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title capitalize font-bold">
                  {approvedClass.className} Class
                </h2>
                <p className="text-lg">
                  <span className="font-semibold">Instractor</span> :{" "}
                  {approvedClass.instractorName}
                </p>
                <div className="flex justify-between text-md">
                  <p>
                    <span className="font-semibold">Available Seats</span> :{" "}
                    {approvedClass.availableSeats}
                  </p>
                  <p>
                    <span className="font-semibold">Price</span> : $
                    {approvedClass.price}
                  </p>
                </div>
                <Link to="/classes" className="flex justify-center">
                  <button className="custom-btn">view all Classes</button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PopularClasses;

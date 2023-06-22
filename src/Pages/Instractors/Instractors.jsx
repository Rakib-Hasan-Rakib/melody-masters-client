import React from "react";
import { useQuery } from "react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Instractors = () => {
  const [axiosSecure] = useAxiosSecure();

  const { data: instractors = [] } = useQuery(
    ["/users/instractors"],
    async () => {
      const res = await axiosSecure.get("/users/instractors");
      return res.data;
    }
  );
//   console.log(instractors);
  return (
    <div>
      <h2 className="section-title">
        total instractors : {instractors.length}{" "}
      </h2>
      <div className="grid md:grid-cols-3 gap-8 my-8 md:my-12">
        {instractors?.map((instractor, i) => {
          return (
            <div
              key={i}
              className="card card-compact bg-base-100 shadow-xl border border-cyan-700 space-y-3"
            >
              <figure>
                <img
                  className="w-full h-[300px] object-cover"
                  src={instractor.photo}
                  alt="Shoes"
                />
              </figure>
              <div className="card-body">
                <p className="text-lg ">
                  <span className="font-semibold">Instractor Name </span>:{" "}
                  {instractor.name}
                </p>
                <p className="text-lg ">
                  <span className="font-semibold">Instractor Email </span>:{" "}
                  {instractor.email}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Instractors;

import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { Fade } from 'react-awesome-reveal';

const PopularInstractors = () => {
    const [axiosSecure] = useAxiosSecure();

    const { data: popularInstractors = [] } = useQuery(
      ["/users/instractors"],
      async () => {
        const res = await axiosSecure.get("/users/instractors");
        return res.data;
      }
    );
    console.log(popularInstractors);
    return (
      <div>
        <Fade delay={1e2} cascade damping={1e-1}>
          <h2 className="section-title">our popular instractors</h2>
        </Fade>

        <div className="grid md:grid-cols-3 gap-8 my-8 md:my-12">
          {popularInstractors?.slice(0, 6).map((instractor, i) => {
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
                  <h2 className="card-title capitalize font-bold">
                    {instractor.name}
                  </h2>
                  <p className="text-lg ">
                    <span className="font-semibold">Instractor Email </span>:{" "}
                    {instractor.email}
                  </p>
                  <Link to="/instractors" className="flex justify-center">
                    <button className="custom-btn">view all instractors</button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
};

export default PopularInstractors;
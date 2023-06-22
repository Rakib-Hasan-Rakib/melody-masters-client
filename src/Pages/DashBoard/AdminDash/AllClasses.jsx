import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "react-query";
import SingleClassCard from "./SingleClassCard";
import { Helmet } from "react-helmet-async";


const AllClasses = () => {
  const [axiosSecure] = useAxiosSecure();

  const { data: classes = [], refetch } = useQuery(["classes"], async () => {
    const res = await axiosSecure.get("/classes");
    return res.data;
  });

  return (
    <div>
      <Helmet>
        <title>Melody Masters | All Classes</title>
      </Helmet>
      <div className="grid md:grid-cols-2 gap-4">
        {classes?.map((singleClass, i) => {
          return (
            <SingleClassCard
              singleClass={singleClass}
              key={i}
              refetch={refetch}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AllClasses;

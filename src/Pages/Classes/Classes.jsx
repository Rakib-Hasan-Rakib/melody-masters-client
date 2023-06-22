import React, { useContext } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "react-query";
import ClassesCard from "./ClassesCard";
import { Fade } from "react-awesome-reveal";

const Classes = () => {
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
        <h2 className="section-title">
          total classes: {approvedClasses.length}
        </h2>
      </Fade>

      <div className="grid md:grid-cols-3 gap-8 my-8 md:my-12">
        {approvedClasses.map((approvedClass, i) => (
          <ClassesCard approvedClass={approvedClass} key={i} />
        ))}
      </div>
    </div>
  );
};

export default Classes;

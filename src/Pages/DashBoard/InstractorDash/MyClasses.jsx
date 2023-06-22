import React, { useContext, useEffect } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "react-query";
import { AuthContext } from "../../../Providers/AuthProvider";
import MyClassesCard from "./MyClassesCard";

const MyClasses = () => {
  const { user } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();

  const { data: myClasses = [] } = useQuery([`myClasses/${user?.email}`], async () => {
    const res = await axiosSecure.get(`/myClasses/${user?.email}`);
    return res.data;
  });
  console.log(myClasses);
  return (
    <div className="grid md:grid-cols-2">
      {myClasses?.map((myClass, i) => {
        return <MyClassesCard myClass={myClass} key={i} />;
      })}
    </div>
  );
};

export default MyClasses;

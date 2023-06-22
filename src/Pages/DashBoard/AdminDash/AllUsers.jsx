import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useQuery } from "react-query";
import ModifiedAlert from "../../../Components/Alerts/ModifiedAlert";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SingleUser from "./SingleUser";

const AllUsers = () => {
  const [axiosSecure] = useAxiosSecure();

  const { data: users = [], refetch } = useQuery(["users"], async () => {
    const res = await axiosSecure.get("/users");
    return res.data;
  });
  

  return (
    <div>
      <Helmet>
        <title>Melody Masters | All Users</title>
      </Helmet>
      <h2 className="section-title">
        Total users: {users.length}
      </h2>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Photo</th>
              <th>Name</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, i) => {
              return <SingleUser user={user} key={i} i={i} refetch={refetch} />;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;

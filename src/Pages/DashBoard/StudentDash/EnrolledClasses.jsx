import React, { useContext } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "react-query";
import { AuthContext } from "../../../Providers/AuthProvider";

const EnrolledClasses = () => {
  const { user } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();

  const { data: enrolledClasses = [] } = useQuery(
    [`paidClasses/${user?.email}`],
    async () => {
      const res = await axiosSecure.get(`/paidClasses/${user?.email}`);
      return res.data;
    }
  );
  return (
    <div>
      <div className="overflow-x-auto border border-cyan-800 rounded-xl">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Class Photo</th>
              <th>Class Name</th>
              <th>Instractor Name</th>
            </tr>
          </thead>
          <tbody>
            {enrolledClasses?.map((enrolledClass, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={enrolledClass.classPhoto}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </td>
                  <td>{enrolledClass.class}</td>
                  <td>{enrolledClass.instractorName}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EnrolledClasses;

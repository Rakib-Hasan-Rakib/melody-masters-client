import React, { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "react-query";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const SelectedClasses = () => {
  const { user } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();

  const { data: selectedClasses = [], refetch } = useQuery(
    [`selectedClasses/${user?.email}`],
    async () => {
      const res = await axiosSecure.get(`/selectedClasses/${user?.email}`);
      return res.data;
    }
  );
  //   console.log(selectedClasses);

  const handleUnselect = (id) => {
    Swal.fire({
      title: "Unselect!",
      text: "Do you wanna unselect this class?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `https://melody-masters-server.vercel.app/selectedClasses/${id}`,
          {
            method: "DELETE",
          }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              refetch();
            }
          });
      }
    });
  };

  return (
    <div className="grid grid-cols-2 gap-4 w-full">
      {selectedClasses?.map((selectedClass, i) => {
        return (
          <div key={i}>
            <div className="card card-compact bg-base-100 shadow-xl">
              <figure>
                <img
                  className="w-full h-[200px] object-cover"
                  src={selectedClass.photoUrl}
                  alt=""
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{selectedClass.className}</h2>
                <p>Instractor Name : {selectedClass.instractorName}</p>
                <p>Price : ${selectedClass.price}</p>
                <div className="card-actions justify-center">
                  <button
                    onClick={() => handleUnselect(selectedClass._id)}
                    className="custom-btn"
                  >
                    Unselect
                  </button>
                  <Link to="/dashboard/payment" state={selectedClass}>
                    <button className="custom-btn">Pay</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SelectedClasses;

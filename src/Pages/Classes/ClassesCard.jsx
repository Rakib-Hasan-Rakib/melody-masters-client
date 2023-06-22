import React, { useContext, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import useInstractor from "../../hooks/useInstractor";
import useAdmin from "../../hooks/useAdmin";
import Swal from "sweetalert2";
import SuccessAlert from "../../Components/Alerts/SuccessAlert";

const ClassesCard = ({ approvedClass }) => {
  const [disable, setDisable] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isInstractor] = useInstractor();
  const [isAdmin] = useAdmin();
  const { photoUrl, className, instractorName, availableSeats, price } =
    approvedClass;

  const handleSelectClass = (approvedClass) => {
    if (!isAdmin && !isInstractor && user) {
      setDisable(false);
      const studentEmail = user.email;
      const classId = approvedClass["_id"];
      const selectedClass = { ...approvedClass, studentEmail, classId };
      delete selectedClass._id;
      fetch("https://melody-masters-server.vercel.app/selectedClasses", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(selectedClass),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          SuccessAlert("You selected this class");
          setDisable(true);
        });
    } else if (!user) {
      Swal.fire({
        title: "Login Required",
        text: "Please take me to the login page",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "go to login page",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    }
  };

  return (
    <div className="card card-compact bg-base-100 shadow-xl border border-orange-500 space-y-3">
      <figure>
        <img
          className="w-full h-[250px] object-cover"
          src={photoUrl}
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title capitalize font-bold">{className} Class</h2>
        <p className="text-lg">
          <span className="font-semibold">Instractor</span> : {instractorName}
        </p>
        <div className="flex justify-between text-md">
          <p>
            <span className="font-semibold">Available Seats</span> :{" "}
            {availableSeats}
          </p>
          <p>
            <span className="font-semibold">Price</span> : ${price}
          </p>
        </div>
        <div className="card-actions justify-center">
          {isAdmin || isInstractor ? (
            <button className="custom-btn" disabled>
              Select Class
            </button>
          ) : (
            <button
              onClick={() => handleSelectClass(approvedClass)}
              className="custom-btn"
              disabled={disable}
            >
              Select Class
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClassesCard;

import React, { useState } from "react";
import SuccessAlert from "../../../Components/Alerts/SuccessAlert";

const SingleClassCard = ({ singleClass, refetch }) => {
  const [disable, setDisable] = useState(false);

  const {
    photoUrl,
    className,
    _id,
    availableSeats,
    instractorName,
    instractorEmail,
    price,
    status,
  } = singleClass;
  console.log(singleClass);

  const handleApprove = (id) => {
    setDisable(true);
    fetch(`https://melody-masters-server.vercel.app/classes/approved/${id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          refetch();
          SuccessAlert("Class Approved");
        }
      });
  };
  const handleDeny = (id) => {
    setDisable(true);
    fetch(`https://melody-masters-server.vercel.app/classes/denied/${id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          refetch();
          SuccessAlert("Class Denied");
        }
      });
  };
  return (
    <div>
      <div className="card card-compact bg-base-100 shadow-xl">
        <figure>
          <img className="w-full h-[200px] object-cover" src={photoUrl} alt="" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{className}</h2>
          <p>Instractor Name : {instractorName}</p>
          <p>Instractor Email : {instractorEmail}</p>
          <p>Available Seats : {availableSeats} </p>
          <p>Price : {price} </p>
          <p>status : {status ? status : "pending"} </p>
          <div className="card-actions justify-end">
            <button
              onClick={() => handleApprove(_id)}
              className="bg-cyan-600 py-1 px-2 rounded-lg text-white capitalize"
              disabled={disable}
            >
              approve
            </button>
            <button
              onClick={() => handleDeny(_id)}
              className="bg-cyan-600 py-1 px-2 rounded-lg text-white capitalize"
              disabled={disable}
            >
              delete
            </button>
            {/* TODO: open modal for feedback */}
            <button className="bg-cyan-600 py-1 px-2 rounded-lg text-white capitalize">
              send feedback
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleClassCard;

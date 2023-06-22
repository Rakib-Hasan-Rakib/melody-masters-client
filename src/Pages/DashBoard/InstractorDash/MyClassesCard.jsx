import React from "react";

const MyClassesCard = ({ myClass }) => {
  const { photoUrl, className, status } = myClass;
  // TODO: feedback text
  return (
    <div>
      <div className="card card-compact bg-base-100 shadow-xl">
        <figure>
          <img
            className="w-full h-[200px] object-cover"
            src={photoUrl}
            alt=""
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{className}</h2>
          <p>
            <span className="font-semibold">Total Enrolled Students</span>: 0
          </p>
          <p>
            <span className="font-semibold">status</span> : {status ? status : "pending"}{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyClassesCard;

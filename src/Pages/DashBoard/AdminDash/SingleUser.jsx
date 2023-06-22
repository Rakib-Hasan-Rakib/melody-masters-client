import React, { useState } from "react";
import ModifiedAlert from "../../../Components/Alerts/ModifiedAlert";

const SingleUser = ({ user, refetch, i }) => {
  const [isDisable, setIsDisable] = useState(false);

  const { photo, name, role } = user;

  const handleCreateInstractor = (user) => {
    fetch(
      `https://melody-masters-server.vercel.app/users/instractor/${user._id}`,
      {
        method: "PATCH",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          refetch();
          ModifiedAlert(photo, `${name} is Instractor now`);
          setIsDisable(true);
        }
      });
  };
  const handleCreateAdmin = (user) => {
    fetch(`https://melody-masters-server.vercel.app/users/admin/${user._id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          refetch();
          ModifiedAlert(photo, `${name} is Admin now`);
          setIsDisable(true);
        }
      });
  };
  return (
    <tr>
      <td>{i + 1}</td>
      <td>
        <div className="avatar">
          <div className="mask mask-squircle w-12 h-12">
            <img src={photo} alt="Avatar Tailwind CSS Component" />
          </div>
        </div>
      </td>
      <td>{name}</td>
      <td>{role ? role : "student"}</td>
      <td className="flex flex-col gap-2">
        <button
          onClick={() => handleCreateInstractor(user)}
          className="bg-cyan-600 py-1 px-2 rounded-lg text-white capitalize"
          disabled={isDisable}
        >
          Make Instractor
        </button>
        <button
          onClick={() => handleCreateAdmin(user)}
          className="bg-cyan-600 py-1 px-2 rounded-lg text-white capitalize"
          disabled={isDisable}
        >
          Make Admin
        </button>
      </td>
    </tr>
  );
};

export default SingleUser;

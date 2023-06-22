import React from "react";
import Swal from "sweetalert2";

const SuccessAlert = (successText) => {
  return Swal.fire({
    title: "Well Done",
    text: successText,
    icon: "success",
    confirmButtonText: "Ok",
  });
};

export default SuccessAlert;

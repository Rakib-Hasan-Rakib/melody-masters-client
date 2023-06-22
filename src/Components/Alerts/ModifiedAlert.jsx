import React from "react";
import Swal from "sweetalert2";

const ModifiedAlert = (image, modifyText) => {
  return Swal.fire({
    title: "Done!",
    text: modifyText,
    imageUrl: image,
    imageWidth: 400,
    imageHeight: 200,
    imageAlt: "Custom image",
  });
};

export default ModifiedAlert;

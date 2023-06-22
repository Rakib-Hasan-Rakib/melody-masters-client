import React from 'react';
import Swal from 'sweetalert2';

const ErrorAlert = (errorText) => {
    return Swal.fire({
      title: "Error",
      text: errorText,
      icon: "error",
      confirmButtonText: "Close",
    });
};

export default ErrorAlert;
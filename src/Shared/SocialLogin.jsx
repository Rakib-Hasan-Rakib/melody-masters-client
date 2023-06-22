import React, { useContext } from "react";
import googleLogo from "../assets/images/logos/google-logo.png";
import SuccessAlert from "../Components/Alerts/SuccessAlert";
import ErrorAlert from "../Components/Alerts/ErrorAlert";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";

const SocialLogin = () => {
  const { googleLogin } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        const registerdUser = {
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        };
        fetch("https://melody-masters-server.vercel.app/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(registerdUser),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data) {
              SuccessAlert("You Logged In Successfully");
              navigate(from, { replace: true });
            }
          });
      })
      .catch((error) => {
        ErrorAlert(error.message);
      });
  };
  return (
    <div className="flex justify-center items-center">
      <img
        onClick={handleGoogleLogin}
        src={googleLogo}
        className="w-14 cursor-pointer"
        alt="Google icon for log in"
      />
    </div>
  );
};

export default SocialLogin;

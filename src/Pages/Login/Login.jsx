import React, { useContext, useState } from "react";
import "./Login.css";
import { useForm } from "react-hook-form";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import SuccessAlert from "../../Components/Alerts/SuccessAlert";
import ErrorAlert from "../../Components/Alerts/ErrorAlert";
import { Helmet } from "react-helmet-async";
import SocialLogin from "../../Shared/SocialLogin";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { loginUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    console.log(data);
    loginUser(data.email, data.password)
      .then(() => {
        SuccessAlert("You Logged In Successfully");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        ErrorAlert(error.message);
      });
  };

  return (
    <>
      <Helmet>
        <title>Melody Masters | Register</title>
      </Helmet>
      <div className="login-container">
        <h2 className="section-title dark:text-yellow-500">Login Now</h2>
        <div className="hero">
          <div className="hero-content w-full">
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <form onSubmit={handleSubmit(onSubmit)} className="card-body pb-0">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="email"
                    {...register("email", { required: true })}
                    className="input input-bordered"
                  />
                  {errors.email && (
                    <span className="text-red-400">Email is required</span>
                  )}
                </div>
                <div className="form-control relative">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <div className="absolute bottom-2 right-4">
                    <button onClick={() => setShowPassword(true)}>
                      {showPassword || (
                        <EyeIcon className="h-5 w-5 text-orange-500"></EyeIcon>
                      )}
                    </button>
                    <button onClick={() => setShowPassword(false)}>
                      {showPassword && (
                        <EyeSlashIcon className="h-5 w-5 text-orange-500"></EyeSlashIcon>
                      )}
                    </button>
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="password"
                    {...register("password", { required: true })}
                    className="input input-bordered"
                  />
                  {errors.password && (
                    <span className="text-red-400">Password is required</span>
                  )}
                </div>
                <div className="form-control mt-6">
                  <input className="custom-btn" type="submit" value="Login" />
                </div>
              </form>
              <div className="text-center">
                <div className="divider px-8">or login with</div>
                <SocialLogin />
              </div>
              <p className="text-center my-2">
                Do not have account yet? <Link to="/register" className="text-blue-500">Regiter</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { AuthContext } from "../../Providers/AuthProvider";
import { Helmet } from "react-helmet-async";
import SuccessAlert from "../../Components/Alerts/SuccessAlert";
import ErrorAlert from "../../Components/Alerts/ErrorAlert";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SocialLogin from "../../Shared/SocialLogin";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { createUser, updateUserInfo } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const onSubmit = (data) => {
    if (data.password !== data.confirmPassword) {
      setPasswordError(true);
      return;
    }
    createUser(data.email, data.password)
      .then(() => {
        updateUserInfo(data.name, data.photoUrl)
          .then(() => {
            const registerdUser = {
              name: data.name,
              email: data.email,
              photo: data.photoUrl,
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
                if (data.insertedId) {
                  reset();
                  SuccessAlert("Your Account Created Successfully");
                  navigate(from, { replace: true });
                }
              });
          })
          .catch((error) => {
            ErrorAlert(error.message);
          });
      })
      .catch(() => {});
  };
  return (
    <>
      <Helmet>
        <title>Melody Masters | Register</title>
      </Helmet>
      <div className="login-container">
        <h2 className="section-title">Please Register</h2>
        <div className="hero">
          <div className="hero-content w-2/5 mx-auto">
            <div className="card w-full shadow-2xl bg-base-100">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="card-body pb-0"
              >
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Your Name Here"
                    {...register("name", { required: true })}
                    className="input input-bordered"
                  />
                  {errors.name && (
                    <span className="text-red-400">Name is required</span>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Enter Your Email Here"
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
                    <p onClick={() => setShowPassword(true)}>
                      {showPassword || (
                        <EyeIcon className="h-5 w-5 text-orange-500"></EyeIcon>
                      )}
                    </p>
                    <p onClick={() => setShowPassword(false)}>
                      {showPassword && (
                        <EyeSlashIcon className="h-5 w-5 text-orange-500"></EyeSlashIcon>
                      )}
                    </p>
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter Your Password Here"
                    {...register("password", {
                      required: true,
                      maxLength: 20,
                      minLength: 6,
                      pattern:
                        /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                    })}
                    className="input input-bordered"
                  />
                  {errors.password?.type === "required" && (
                    <p className="text-red-400">Password is required</p>
                  )}
                  {errors.password?.type === "minLength" && (
                    <p className="text-red-400">
                      Password must be 6 characters long
                    </p>
                  )}
                  {errors.password?.type === "maxLength" && (
                    <p className="text-red-400">
                      Password can not contain more than 20 characters
                    </p>
                  )}
                  {errors.password?.type === "pattern" && (
                    <p className="text-red-400">
                      Password must have one Uppercase, one lower case, one
                      number and one special character.
                    </p>
                  )}
                </div>
                <div className="form-control relative">
                  <label className="label">
                    <span className="label-text">Confirm Password</span>
                  </label>
                  <div className="absolute bottom-2 right-4">
                    <p onClick={() => setShowConfirmPassword(true)}>
                      {showConfirmPassword || (
                        <EyeIcon className="h-5 w-5 text-orange-500"></EyeIcon>
                      )}
                    </p>
                    <p onClick={() => setShowConfirmPassword(false)}>
                      {showConfirmPassword && (
                        <EyeSlashIcon className="h-5 w-5 text-orange-500"></EyeSlashIcon>
                      )}
                    </p>
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Your Password"
                    {...register("confirmPassword", { required: true })}
                    className="input input-bordered"
                  />

                  {errors.confirmPassword?.type === "required" && (
                    <span className="text-red-400">
                      You must confirm your password
                    </span>
                  )}
                  {passwordError && (
                    <span className="text-red-400">
                      Your password does not match
                    </span>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Photo URL</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Drop Your Photo URL Here"
                    {...register("photoUrl", { required: true })}
                    className="input input-bordered"
                  />
                  {errors.photoUrl && (
                    <span className="text-red-400">Photo URL is required</span>
                  )}
                </div>
                <div className="form-control mt-6">
                  <input
                    className="custom-btn"
                    type="submit"
                    value="Register"
                  />
                </div>
              </form>
              <div className="text-center">
                <div className="divider px-8">or register with</div>
                <SocialLogin />
              </div>
              <p className="text-center my-2">
                Already have account?{" "}
                <Link to="/login" className="text-blue-500">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;

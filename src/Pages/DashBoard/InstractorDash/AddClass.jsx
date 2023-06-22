import React, { useContext, useRef } from "react";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../../Providers/AuthProvider";

const AddClass = () => {
  const { user } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const instractorNameRef = useRef();
  const instractorEmailRef = useRef();

  const onSubmit = (data) => {
    const instractorName = instractorNameRef.current.value;
    const instractorEmail = instractorEmailRef.current.value;
    const classDetail = { ...data, instractorName, instractorEmail };
    console.log(classDetail);
    fetch("https://melody-masters-server.vercel.app/classes", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(classDetail),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          reset();
        }
      });
  };

  return (
    <>
      <Helmet>
        <title>Melody Masters | Add Class</title>
      </Helmet>
      <div className="login-container w-full">
        <h2 className="section-title">Add a Class</h2>
        <div className="hero w-full">
          <div className="hero-content w-2/5 mx-auto">
            <div className="card shadow-2xl bg-base-100">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="card-body w-full"
              >
                <div className="form-control w-[400px]">
                  <label className="label">
                    <span className="label-text">Class Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Your class Name Here"
                    {...register("className", { required: true })}
                    className="input input-bordered"
                  />
                  {errors.className && (
                    <span className="text-red-400">Class Name is required</span>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Class Image</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Drop Your Class Photo URL Here"
                    {...register("photoUrl", { required: true })}
                    className="input input-bordered"
                  />
                  {errors.photoUrl && (
                    <span className="text-red-400">Photo URL is required</span>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Instractor Name</span>
                  </label>
                  <input
                    value={user?.displayName}
                    className="input input-bordered"
                    readOnly
                    ref={instractorNameRef}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Instractor Email</span>
                  </label>
                  <input
                    value={user?.email}
                    className="input input-bordered"
                    readOnly
                    ref={instractorEmailRef}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Available Seats</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Enter Your Available Seat Here"
                    {...register("availableSeats", { required: true })}
                    className="input input-bordered"
                  />
                  {errors.availableSeats && (
                    <span className="text-red-400">
                      Available Seats is required
                    </span>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Price</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Enter Price Here"
                    {...register("price", { required: true })}
                    className="input input-bordered"
                  />
                  {errors.price && (
                    <span className="text-red-400">Price is required</span>
                  )}
                </div>
                <div className="form-control mt-6">
                  <input
                    className="custom-btn"
                    type="submit"
                    value="Add Class"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddClass;

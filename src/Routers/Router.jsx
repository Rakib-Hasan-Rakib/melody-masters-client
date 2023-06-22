import React from "react";
import { createBrowserRouter } from "react-router-dom";
import LayOut from "../LayOut/LayOut";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Classes from "../Pages/Classes/Classes";
import Instractors from "../Pages/Instractors/Instractors";
import DashBoard from "../LayOut/DashBoard";
import StudentHome from "../Pages/DashBoard/StudentDash/StudentHome";
import AllUsers from "../Pages/DashBoard/AdminDash/AllUsers";
import InstractorHome from "../Pages/DashBoard/InstractorDash/InstractorHome";
import AdminHome from "../Pages/DashBoard/AdminDash/AdminHome";
import AddClass from "../Pages/DashBoard/InstractorDash/AddClass";
import AllClasses from "../Pages/DashBoard/AdminDash/AllClasses";
import MyClasses from "../Pages/DashBoard/InstractorDash/MyClasses";
import SelectedClasses from "../Pages/DashBoard/StudentDash/SelectedClasses";
import Payment from "../Pages/DashBoard/StudentDash/Payment";
import EnrolledClasses from "../Pages/DashBoard/StudentDash/EnrolledClasses";
import PaymentHistory from "../Pages/DashBoard/StudentDash/PaymentHistory";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <LayOut />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "classes",
        element: <Classes />,
      },
      {
        path: "instractors",
        element: <Instractors />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashBoard />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "adminHome",
        element: <AdminHome />,
      },
      {
        path: "instractorHome",
        element: <InstractorHome />,
      },
      {
        path: "addClass",
        element: <AddClass />,
      },
      {
        path: "myClasses",
        element: <MyClasses />,
      },
      {
        path: "studentHome",
        element: <StudentHome />,
      },
      {
        path: "selectedClasses",
        element: <SelectedClasses />,
      },
      {
        path: "enrolledClasses",
        element: <EnrolledClasses />,
      },
      {
        path: "paymentHistory",
        element: <PaymentHistory />,
      },
      {
        path: "payment",
        element: <Payment />,
      },
      {
        path: "allUsers",
        element: <AllUsers />,
      },
      {
        path: "allClasses",
        element: <AllClasses />,
      },
    ],
  },
]);

export default Router;

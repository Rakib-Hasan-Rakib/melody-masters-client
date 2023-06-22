import React, { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useInstractor from "../hooks/useInstractor";

const DashBoard = () => {
  const [isAdmin] = useAdmin();
  const [isInstractor] = useInstractor();
  const menuItem = (
    <>
      {isAdmin && (
        <>
          <li>
            <NavLink to="/dashboard/adminHome">Admin Home</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/allUsers">Manage Users</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/allClasses">All Classes</NavLink>
          </li>
        </>
      )}
      {isInstractor && (
        <>
          <li>
            <NavLink to="/dashboard/instractorHome">Instractor Home</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/myClasses">My Classes</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/addClass">Add a Class</NavLink>
          </li>
        </>
      )}
      {isAdmin || isInstractor || (
        <>
          <li>
            <NavLink to="/dashboard/studentHome">Student Home</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/selectedClasses">
              My Selected Classes
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/enrolledClasses">
              My Enrolled Classes
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/paymentHistory">Payment History</NavLink>
          </li>
        </>
      )}
    </>
  );
  return (
    <>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          {/* Page content here */}
          <div className="my-8 w-4/5 mx-auto">
            <Outlet />
          </div>
          <label htmlFor="my-drawer-2" className="custom-btn lg:hidden">
            Open drawer
          </label>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-60 h-full bg-base-200 text-base-content py-12">
            {/* Sidebar content here */}
            {menuItem}
            <div className="divider"></div>
            <li>
              <NavLink to="/"> Home</NavLink>{" "}
            </li>
            <li>
              <NavLink to="/classes"> Classes</NavLink>
            </li>
            <li>
              <NavLink to="/instractors">Instractors</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default DashBoard;

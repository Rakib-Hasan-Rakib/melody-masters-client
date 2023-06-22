import React, { useContext, useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import brandLogo from "../assets/images/logos/MelodyMasters-removebg-preview.png";
import { AuthContext } from "../Providers/AuthProvider";
import useAdmin from "../hooks/useAdmin";
import useInstractor from "../hooks/useInstractor";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logOutUser } = useContext(AuthContext);
  const [isAdmin] = useAdmin();
  const [isInstractor] = useInstractor();
  const handleLogOut = () => {
    logOutUser()
      .then(() => {})
      .catch(() => {});
  };
  const MenuItem = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/classes">Classes</Link>
      </li>
      <li>
        <Link to="/instractors">Instractors</Link>
      </li>
      {user ? (
        <>
          {isAdmin && (
            <li>
              <Link to="/dashboard/adminHome">DashBoard</Link>
            </li>
          )}
          {isInstractor && (
            <li>
              <Link to="/dashboard/instractorHome">DashBoard</Link>
            </li>
          )}
          {!isAdmin && !isInstractor && (
            <li>
              <Link to="/dashboard/studentHome">DashBoard</Link>
            </li>
          )}
          <li onClick={handleLogOut}>
            <Link>LogOut</Link>
          </li>
          <div className="avatar">
            <div className="w-10 rounded-full ring ring-cyan-900 ring-offset-base-100 ring-offset-2">
              <img src={user?.photoURL} alt="user-avatar" />
            </div>
          </div>
        </>
      ) : (
        <li>
          <Link to="/login">Login</Link>
        </li>
      )}
    </>
  );
  return (
    <>
      <div className="navbar border bg-cyan-300 mb-2">
        <div className="navbar flex justify-between items-center">
          <Link to="/" className="text-xl">
            <img src={brandLogo} className="w-32" alt="" />
          </Link>
          <div className="dropdown z-50">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              {menuOpen && (
                <XMarkIcon
                  onClick={() => setMenuOpen(false)}
                  className="h-6 w-6 text-black"
                />
              )}
              {menuOpen || (
                <Bars3Icon
                  onClick={() => setMenuOpen(true)}
                  className="h-6 w-6 text-black"
                />
              )}
            </label>
            <ul
              tabIndex={0}
              className={`menu menu-sm dropdown-content mt-3 p-2 flex items-center gap-2 bg-cyan-600 rounded-box ${
                menuOpen ? "absolute right-1" : "hidden"
              }`}
            >
              {MenuItem}
            </ul>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{MenuItem}</ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;

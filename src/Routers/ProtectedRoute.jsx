import React, { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import Spinner from "../Components/Spinners/Spinner";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  if (loading) {
    return <Spinner />;
  }
  if (user) {
    return children;
  } else {
    <Navigate to="/login" state={{ from: location }} replace />;
  }
};

export default ProtectedRoute;

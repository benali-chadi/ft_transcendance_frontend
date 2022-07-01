import React, { useContext } from "react";
import { Navigate } from "react-router";
import { userContext } from "../helpers/context";

const ProtectedRoute = ({ redirectPath = "/login", children, toCheck }) => {

	if (toCheck) return <Navigate to={redirectPath} replace />;

	return children;
};

export default ProtectedRoute;

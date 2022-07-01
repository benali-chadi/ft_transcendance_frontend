import React, { useContext } from "react";
import { Navigate } from "react-router";
import { userContext } from "../helpers/context";

const ProtectedRoute = ({ redirectPath = "/login", children }) => {
	const { user } = useContext(userContext);

	if (!user) return <Navigate to={redirectPath} replace />;

	return children;
};

export default ProtectedRoute;

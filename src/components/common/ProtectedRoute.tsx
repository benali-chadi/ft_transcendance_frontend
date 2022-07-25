import React, { FC, useContext } from "react";
import { Navigate } from "react-router";
import { userContext } from "../helpers/context";

interface Props {
	redirectPath?: string,
	children: JSX.Element,
	toCheck: boolean
}

const ProtectedRoute:FC<Props> = ({ redirectPath = "/login", children, toCheck }) => {
	if (toCheck) return <Navigate to={redirectPath} replace />;

	return children;
};

export default ProtectedRoute;

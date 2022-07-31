import React, { FC } from "react";
import { Navigate, Location } from "react-router";
import { userContext } from "../helpers/context";

interface Props {
	children: JSX.Element;
	toCheck: boolean;
	location: Location;
}

const ProtectedRoute: FC<Props> = ({ children, toCheck, location }) => {
	if (location.pathname === "/login" && toCheck)
		return <Navigate to="/" replace />;

	if (location.pathname !== "/login" && toCheck)
		return <Navigate to={location.pathname} replace />;

	return children;
};

export default ProtectedRoute;

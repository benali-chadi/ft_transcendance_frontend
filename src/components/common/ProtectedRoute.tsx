import path from "path";
import React, { FC } from "react";
import { Navigate } from "react-router";
import { userContext } from "../helpers/context";

interface Props {
	redirectPath?: string;
	children: JSX.Element;
}

const ProtectedRoute: FC<Props> = ({
	redirectPath = "/login",
	children,
}) => {
	let test = localStorage.getItem("CurrentUser");
	if (!test && redirectPath !== "/")
		return <Navigate to={redirectPath} replace />;
	if (test && redirectPath === "/")
		return <Navigate to={redirectPath} replace />;
	return children;
};

export default ProtectedRoute;

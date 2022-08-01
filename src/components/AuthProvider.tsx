// import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { userContext } from "./helpers/context";

interface Props {
	children: JSX.Element;
}

const AuthProvider: FC<Props> = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	// const [isLogged, setIsLogged] = useState(false);
	const isMobile = useMediaQuery({
		query: "(max-width: 767px)",
	});

	useEffect(() => {
		let storage = localStorage.getItem("CurrentUser");
		if (storage) {
			setCurrentUser(JSON.parse(storage));
		}
	}, []);

	const isAuth = () => !!currentUser;

	return (
		<userContext.Provider value={{ currentUser, setCurrentUser, isMobile }}>
			{children}
		</userContext.Provider>
	);
};

export default AuthProvider;

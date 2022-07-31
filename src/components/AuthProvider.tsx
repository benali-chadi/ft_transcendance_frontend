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

	// useEffect((): any => {
	// 	async function getUserData() {
	// 		try {
	// 			let { data } = await axios.get(
	// 				"http://localhost:3000/user/me",
	// 				{
	// 					withCredentials: true,
	// 				}
	// 			);
	// 			setCurrentUser(data);
	// 			setIsLogged(true);
	// 		} catch (e) {
	// 			setCurrentUser(null);
	// 			// setIsLogged(false);
	// 		}
	// 	}
	// 	getUserData();
	// }, []);
	useEffect(() => {
		let storage = localStorage.getItem("CurrentUser");
		//console.log(storage);
		if (storage) {
			setCurrentUser(JSON.parse(storage));
			// setIsLogged(true);
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

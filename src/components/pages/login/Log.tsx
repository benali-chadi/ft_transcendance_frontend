import React, { FC, useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
// import { createHashHistory } from "history";
import axios from "axios";
import { userContext } from "../../helpers/context";
// import { motion } from "framer-motion";
import Loader from "../../common/Loader";
import { UserState } from "../../helpers/context";
import env from "react-dotenv";

const Log: FC = () => {
	const { setCurrentUser } = useContext<UserState>(userContext);
	const [searchParams, setSearchParams] = useSearchParams();
	const navigate = useNavigate();

	let query = searchParams.getAll("code");

	useEffect(() => {
		async function test() {
			let { data } = await axios.get(
				`${process.env.REACT_APP_BACKEND_URL}auth/redirect?code=${query[0]}`,
				{ withCredentials: true }
			);
			// const browserHistory = createHashHistory();
			if (data.user) {
				setCurrentUser(data.user);
				localStorage.setItem("CurrentUser", JSON.stringify(data.user));
				navigate("/");
			}
		}
		test();
	}, []);
	return (
		<div className="flex flex-col items-center justify-center w-screen h-screen">
			<Loader />
		</div>
	);
};

export default Log;

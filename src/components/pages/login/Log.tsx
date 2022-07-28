import React, { FC, useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
// import { createHashHistory } from "history";
import axios from "axios";
import { userContext } from "../../helpers/context";
import { motion } from "framer-motion";
import Loader from "../../common/Loader";
import { UserState } from "../../helpers/context";

const Log: FC = () => {
	const { setUser } = useContext<UserState>(userContext);
	const [searchParams, setSearchParams] = useSearchParams();
	const navigate = useNavigate();

	let query = searchParams.getAll("code");

	useEffect(() => {
		async function test() {
			let { data } = await axios.get(
				"http://localhost:3000/auth/redirect?code=" + query[0],
				{ withCredentials: true }
			);
			console.log(data);
			if (data) {
				// const browserHistory = createHashHistory();

				navigate("/");
			}
			setUser(data.user);
		}

		test();
	});
	return (
		<div className="flex flex-col items-center justify-center w-screen h-screen">
			<Loader />
		</div>
	);
};

export default Log;

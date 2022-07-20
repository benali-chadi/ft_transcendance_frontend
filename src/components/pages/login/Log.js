import React, { useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
// import { createHashHistory } from "history";
import axios from "axios";
import { userContext } from "../../helpers/context";
import { motion } from "framer-motion";
import Loader from "../../common/Loader";

const Log = () => {
	const { setUser } = useContext(userContext);
	const [searchParams, setSearchParams] = useSearchParams();
	const navigate = useNavigate();

	let query = searchParams.getAll("code");

	useEffect(() => {
		async function test() {
			let data = await axios.post(
				"http://localhost:9000/login?code=" + query[0],
				{},
				{ withCredentials: true }
			);
			if (data.data) {
				// const browserHistory = createHashHistory();

				navigate("/");
			}
			setUser(data.data);
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

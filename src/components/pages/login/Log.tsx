import React, { FC, useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
// import { createHashHistory } from "history";
import axios from "axios";
import { userContext } from "../../helpers/context";
// import { motion } from "framer-motion";
import Loader from "../../common/Loader";
import { UserState } from "../../helpers/context";
import env from "react-dotenv";
import TFAActivation from "./TFA_activation";

const Log: FC = () => {
	const { setCurrentUser } = useContext<UserState>(userContext);
	const [searchParams, setSearchParams] = useSearchParams();
	const navigate = useNavigate();
	const [show2FA, setShow2FA] = useState(false)

	let query = searchParams.getAll("code");

	useEffect(() => {
		async function test() {
			let { data } = await axios.get(
				`${process.env.REACT_APP_BACKEND_URL}auth/redirect?code=${query[0]}`,
				{ withCredentials: true }
			);
			// const browserHistory = createHashHistory();
			if (data.user) {
				
				console.log("user =", data.user.TFA_enabled)
				if (data.user.TFA_enabled)
				{
					console.log("okokok")
					setShow2FA(true)
				}
				else {
					setCurrentUser(data.user);
					localStorage.setItem("CurrentUser", JSON.stringify(data.user));
					navigate("/");
				}
			}
		}
		test();
	}, []);
	return (
		<div className="flex flex-col items-center justify-center w-screen h-screen">
			{show2FA && <TFAActivation toDo="verify" handleCancel={() => {setShow2FA(false); navigate("/login")}}/>}
			<Loader />
		</div>
	);
};

export default Log;

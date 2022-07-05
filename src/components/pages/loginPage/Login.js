import React from "react";
import Button from "../../common/Button";
import SignUp from "./Signup";

import background from "../../../img/login-background.jpg";
import logo from "../../../img/logo.png";
import { ReactComponent as Logo42 } from "../../../img/42logo.svg";
import { useState } from "react";

const Login = () => {
	const [showSignUp, setShowSignUp] = useState(false);

	const backgroundStyle = {
		backgroundImage: `url('${background}')`,
	};

	const handleLoginClick = () => {
		// setShowSignUp(!showSignUp);
		document.location.href =
			"https://api.intra.42.fr/oauth/authorize?client_id=78c3d2bb240eb8f7edc6df1410e59c41f9faab03cf2af5ba88e04e1da9a489a8&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2FTest&response_type=code";
	};

	return (
		<div
			className="h-screen w-full bg-gradient-to-r from-[#D8E3F7] to-[#E4CFBA] overflow-auto
                        md:p-12 md:py-20 flex flex-col justify-center"
		>
			{showSignUp && <SignUp handleCancelClick={handleLoginClick} />}

			<div
				className="h-screen min-h-max overflow-y-auto bg-50%w bg-no-repeat bg-top flex flex-col justify-end my-auto
                            md:rounded-large md:grid md:grid-cols-5 md:min-h-[50rem]
							md:h-5/6
							md:grid-rows-1
                            md:bg-right md:bg-50%h
            "
				style={backgroundStyle}
			>
				<div className="flex flex-col items-center justify-center gap-8 py-8 h-3/5 scroll min-h-fit bg-my-dark-lavender rounded-t-large md:col-span-3 md:h-full md:justify-center md:rounded-large ">
					<img src={logo} alt="logo" className="h-32 2xl:h-48" />
					<h1 className="text-4xl font-extrabold font-header xl:text-5xl 2xl:text-6xl">
						Welcome To Pong
					</h1>
					<h2 className="text-3xl font-thin font-header xl:text-4xl 2xl:text-5xl">
						Login with Intra
					</h2>
					<Button
						handleClick={handleLoginClick}
						color="bg-my-yellow"
						hoverColor="bg-yellow-300"
					>
						<Logo42
							width="50%"
							height="100%"
							style={{
								minHeight: "4rem",
							}}
						/>
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Login;

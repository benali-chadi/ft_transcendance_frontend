import React, { useContext } from "react";
import Section from "../common/Section";
import List from "../common/List";
import UserCard from "../common/UserCard";

import background from "../../img/game-system/background.jpg";
import inviteImage from "../../img/game-system/section2.jpg";
import randomImage from "../../img/game-system/section1.jpg";
import { userContext } from "../helpers/context";
import { motion } from "framer-motion";
// import { pageVariantDesktop, pageVariantMobile } from "./helpers/variants";

const Home = () => {
	const { user /*isMobile*/ } = useContext(userContext);

	const backgroundStyle = {
		backgroundImage: `url('${background}')`,
	};

	// const pageVariant = isMobile ? pageVariantMobile : pageVariantDesktop;
	const pageVariant = {
		initial: {
			opacity: 0,
		},
		animate: {
			opacity: 1,
			transition: {
				duration: 0.75,
				type: "tween",
				// stiffness: 300,
			},
		},
		exit: {
			opacity: 0,
		},
	};

	return (
		<motion.div
			variants={pageVariant}
			initial="initial"
			animate="animate"
			exit="exit"
			className="h-screen overflow-auto bg-white scroll md:h-full min-h-max md:rounded-large md:rounded-l-none md:grid md:grid-cols-5 md:grid-rows-1 "
		>
			{/* Game System */}
			<div
				className="p-8 overflow-auto bg-no-repeat bg-cover scroll h-3/5 min-h-max rounded-b-large md:col-span-3 md:h-full md:justify-center md:rounded-large md:rounded-l-none "
				style={backgroundStyle}
			>
				{/* Headers */}
				<div className="sticky flex flex-col items-start justify-center mb-3 top-5 left-3 ">
					<h1 className="text-6xl font-extrabold text-my-yellow">
						PONG
					</h1>
					<h2 className="font-bold text-my-yellow">Create a Game</h2>
				</div>
				{/* Sections */}
				<div className="flex flex-col justify-center h-full gap-4 ">
					<Section
						title="Invite Friends"
						image={inviteImage}
						color="bg-my-orange"
					/>
					<Section
						title="Random"
						image={randomImage}
						color="bg-my-green"
					/>
				</div>
			</div>
			{/* The Right\bottom Side */}
			<div className="flex flex-col gap-8 p-8 overflow-auto scroll md:col-span-2">
				{/* User */}
				<div className="hidden w-full h-16 md:block">
					<UserCard />
				</div>
				{/* Lists */}
				<List title="leaderboard" icon="fa-solid fa-crown fa-xs"></List>
				<List
					title="Currently Playing"
					icon="fa-solid fa-table-tennis-paddle-ball fa-xs"
				></List>
			</div>
		</motion.div>
	);
};

export default Home;

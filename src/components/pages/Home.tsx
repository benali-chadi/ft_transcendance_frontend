import React, { FC, useContext, useEffect, useState } from "react";
import Section from "../common/Section";
import List from "../common/List";
import UserCard from "../common/UserCard";
// @ts-ignore
import background from "../../img/game-system/background.jpg";
// @ts-ignore
import inviteImage from "../../img/game-system/section2.jpg";
// @ts-ignore
import randomImage from "../../img/game-system/section1.jpg";
import { userContext, UserState } from "../helpers/context";
import { motion } from "framer-motion";
import { pageVariants } from "../helpers/variants";
import { useNavigate } from "react-router-dom";
import CurrentlyPlayingCard from "./homecards/CurrentlyPlayingCard";
import LeaderBoardCard from "./homecards/LeaderBoardCard";

// import { pageVariantDesktop, pageVariantMobile } from "./helpers/variants";

let obj = {
	GameId: "1",
	Player1Score: 0,
	Player2Score: 2,
	Player1Avatar: "https://cdn.intra.42.fr/users/small_ybarhdad.jpg",
	Player2Avatar: "https://cdn.intra.42.fr/users/small_razaha.jpg",
};

const Home: FC = () => {
	// const [currentUser, setUser] = useState<any>(null);
	const { currentUser } = useContext<UserState>(userContext);
	const backgroundStyle = {
		backgroundImage: `url('${background}')`,
	};

	const navigate = useNavigate();

	return (
		<motion.div
			variants={pageVariants}
			initial="initial"
			animate="animate"
			exit="exit"
			className="h-screen bg-white md:h-[80vh] md:rounded-large md:rounded-l-none md:grid md:grid-cols-5 md:grid-rows-1 "
		>
			{/* Game System */}
			<div
				className="p-8 overflow-auto bg-no-repeat bg-cover scrolling h-3/5 rounded-b-large md:col-span-3 md:h-full md:justify-center md:rounded-large md:rounded-l-none "
				style={backgroundStyle}
			>
				{/* Headers */}
				<div className="sticky flex flex-col mb-3 text-center top-5 left-3 ">
					<h1 className="text-6xl font-extrabold text-my-yellow">
						PONG
					</h1>
					<h2 className="font-bold text-my-yellow">Create a Game</h2>
				</div>
				{/* Sections */}
				<div className="flex flex-col justify-center h-full gap-4 ">
					<Section
						handleClick={() => {
							navigate("/invitefriend");
						}}
						title="Invite Friends"
						image={inviteImage}
						color="bg-my-orange"
					/>
					<Section
						handleClick={() => {
							navigate("/game");
						}}
						title="Random"
						image={randomImage}
						color="bg-my-green"
					/>
				</div>
			</div>
			{/* The Right\bottom Side */}
			<div className="flex flex-col max-h-full gap-8 p-8 overflow-auto md:col-span-2">
				{/* User */}
				<div className="hidden w-full h-fit md:block">
					<UserCard user={currentUser} />
				</div>
				{/* Lists */}
				<List title="leaderboard" icon="fa-solid fa-crown fa-xs">
					<div className="flex flex-col items-center w-full p-2 overflow-auto">
						<LeaderBoardCard
							rank="1"
							username="ybarhdad"
							avatar="https://cdn.intra.42.fr/users/small_ybarhdad.jpg"
							level="7"
						/>
						<LeaderBoardCard
							rank="2"
							username="razaha"
							avatar="https://cdn.intra.42.fr/users/small_razaha.jpg"
							level="5"
						/>
						<LeaderBoardCard
							rank="3"
							username="alagrini"
							avatar="https://cdn.intra.42.fr/users/small_alagrini.jpg"
							level="3"
						/>
						<LeaderBoardCard
							rank="3"
							username="alagrini"
							avatar="https://cdn.intra.42.fr/users/small_alagrini.jpg"
							level="3"
						/>
						<LeaderBoardCard
							rank="3"
							username="alagrini"
							avatar="https://cdn.intra.42.fr/users/small_alagrini.jpg"
							level="3"
						/>
					</div>
				</List>
				<List
					title="Currently Playing"
					icon="fa-solid fa-table-tennis-paddle-ball fa-xs"
				>
					<div className="flex flex-col items-center w-full p-2">
						<CurrentlyPlayingCard
							score1={obj.Player1Score}
							score2={obj.Player2Score}
							avatar1={obj.Player1Avatar}
							avatar2={obj.Player2Avatar}
						/>
						<CurrentlyPlayingCard
							score1={obj.Player1Score}
							score2={obj.Player2Score}
							avatar1={obj.Player1Avatar}
							avatar2={obj.Player2Avatar}
						/>
						<CurrentlyPlayingCard
							score1={obj.Player1Score}
							score2={obj.Player2Score}
							avatar1={obj.Player1Avatar}
							avatar2={obj.Player2Avatar}
						/>
						<CurrentlyPlayingCard
							score1={obj.Player1Score}
							score2={obj.Player2Score}
							avatar1={obj.Player1Avatar}
							avatar2={obj.Player2Avatar}
						/>
					</div>
				</List>
			</div>
		</motion.div>
	);
};

export default Home;

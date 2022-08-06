import React, { FC, useContext, useEffect, useRef, useState } from "react";
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
import CurrentlyPlayingCard from "../common/homecards/CurrentlyPlayingCard";
import LeaderBoardCard from "../common/homecards/LeaderBoardCard";
import { io } from "socket.io-client";

// import { pageVariantDesktop, pageVariantMobile } from "./helpers/variants";

let obj = {
	GameId: "1",
	Player1Score: 0,
	Player2Score: 2,
	Player1Avatar: "https://cdn.intra.42.fr/users/small_ybarhdad.jpg",
	Player2Avatar: "https://cdn.intra.42.fr/users/small_razaha.jpg",
};

interface  currentMatchDto {
	id: string;
	Player1Score: number;
	Player2Score: number;
	Player1Avatar: string;
	Player2Avatar: string;

}


const Home: FC = () => {
	// const [currentUser, setUser] = useState<any>(null);
	const { currentUser } = useContext<UserState>(userContext);
	const [socket, setSocket] = useState<any>();
	// useRef to store socket
	const ref = useRef<any>();
	const [toggle, setToggle] = useState(false);
	const [currentMatch, setCurrentMatch] = useState<currentMatchDto []>([]);
	const backgroundStyle = {
		backgroundImage: `url('${background}')`,
	};

	// connect to socket

	useEffect(() => {
		// setSocket( io("http://localhost:3000/game", {withCredentials: true}));
		// set sokcet to ref
		if (ref.current == undefined) {
			ref.current = io("http://localhost:3000/game", { withCredentials: true });		
			ref.current.emit("getcurrentmatch");

		}
	
		ref.current.on("connect", () => {
			console.log("connected");
		});
		ref.current.on("getcurrentmatch", (data : currentMatchDto []) => {
				console.log(data);
				setCurrentMatch(data);
				console.log(currentMatch);
		});
	},[]);

	useEffect(() => {
		console.log(currentMatch);
	}, [currentMatch])
	// })


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
				className="top-0 p-8 overflow-auto bg-no-repeat bg-cover scrolling h-3/5 rounded-b-large md:col-span-3 md:h-full md:justify-center md:rounded-large md:rounded-l-none "
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
			<div className="flex flex-col gap-8 p-8 md:col-span-2">
				{/* User */}
				<div className="hidden w-full h-fit md:block">
					<UserCard user={currentUser} />
				</div>
				{/* Lists */}
				<div>
					{/* Toggle */}
					<div className="grid grid-cols-2">
						<div
							className={`flex flex-col gap-1 p-4 ${
								!toggle
									? "bg-my-violet"
									: "bg-my-violet/80 hover:opacity-80"
							}  px-2 rounded-t-med cursor-pointer text-center`}
							onClick={() => setToggle(false)}
						>
							<i
								className={`fa-solid fa-crown text-my-yellow self-center`}
							></i>
							<h2 className="text-xl font-bold text-white uppercase ">
								leaderboard
							</h2>
						</div>
						<div
							className={`flex flex-col gap-1 p-4 ${
								toggle
									? "bg-my-violet"
									: "bg-my-violet/80 hover:opacity-80"
							} px-7 rounded-t-med cursor-pointer text-center`}
							onClick={() => setToggle(true)}
						>
							<i
								className={`fa-solid fa-table-tennis-paddle-ball text-my-yellow self-center`}
							></i>
							<h2 className="text-xl font-bold text-white uppercase ">
								Currently Playing
							</h2>
						</div>
					</div>
					{/* Leaderboard */}
					{!toggle && (
						<List>
							<>
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
							</>
						</List>
					)}
					{/* Currently playing */}
					{toggle && (
						<List>
							<>

								{
									currentMatch.map((match, index) => {
										return <CurrentlyPlayingCard
									
										score1={match.Player1Score}
										score2={match.Player2Score}
										avatar1={match.Player1Avatar}
										avatar2={match.Player2Avatar}
									/>
									})
								}
							</>
						</List>
					)}
				</div>
			</div>
		</motion.div>
	);
};

export default Home;

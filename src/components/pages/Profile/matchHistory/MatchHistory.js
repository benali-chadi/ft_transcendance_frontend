import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import pongRacket from "../../../../img/ping-pong.png";
import MatchCard from "./MatchCard";

const MatchHistory = () => {
	const navigate = useNavigate();
	const [filter, setFilter] = useState("all");

	const handleClick = () => {
		navigate("/profile");
	};

	return (
		<div className="absolute inset-0 z-10 w-full h-screen px-6 py-20 bg-my-blue md:relative md:h-full">
			{/* Back Button */}
			<i
				className="absolute text-white cursor-pointer left-5 top-15 fa-solid fa-arrow-left md:hidden"
				onClick={handleClick}
			></i>
			{/* Title */}
			<div className="flex items-center justify-center gap-4 py-8">
				<img
					src={pongRacket}
					alt="ping-pong racket"
					className="w-[5rem] h-[5rem]"
				/>
				<h2 className="text-4xl font-extrabold text-my-red">
					Match History
				</h2>
			</div>
			{/* Match History Table */}
			<div className=" scroll m-auto min-w-fit w-[80%] overflow-auto rounded-b-med">
				{/* Tabs */}
				<div className="flex">
					<h2
						className={`w-full py-4 text-2xl text-white ${
							filter === "all"
								? "bg-my-violet"
								: "bg-my-light-violet"
						} rounded-t-med`}
					>
						All
					</h2>
					<h2
						className={`w-full py-4 text-2xl text-white ${
							filter === "wins"
								? "bg-my-violet"
								: "bg-my-light-violet"
						} bg-my-violet rounded-t-med`}
					>
						Wins
					</h2>
					<h2
						className={`w-full py-4 text-2xl text-white bg-my-violet rounded-t-med`}
					>
						Loses
					</h2>
				</div>
				{/* Matches */}
				<MatchCard result="won" />
				<MatchCard result="lost" />
				<MatchCard result="won" />
				<MatchCard result="lost" />
			</div>
		</div>
	);
};

export default MatchHistory;

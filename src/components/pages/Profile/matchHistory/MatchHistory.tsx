import React, { FC } from "react";
import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import matchHistory from "../../../../img/history.png";
import MatchCard from "./MatchCard";
import { outletContext } from "../Profile";

const MatchHistory: FC = () => {
	const navigate = useNavigate();
	const [filter, setFilter] = useState("all");
	const { username } = useOutletContext<outletContext>();

	const handleClick = () => {
		navigate(`/profile/${username}`);
	};

	return (
		<div className="absolute inset-0 z-30 w-full h-screen px-6 py-20 overflow-auto bg-my-blue md:relative md:z-0 md:h-full scrolling">
			{/* Back Button */}
			<i
				className="absolute text-white cursor-pointer left-5 top-15 fa-solid fa-arrow-left md:hidden"
				onClick={handleClick}
			></i>
			{/* Title */}
			<div className="flex items-center justify-center py-8 md:gap-4">
				<img
					src={matchHistory}
					alt="ping-pong racket"
					className=" md:w-[15rem] md:h-[15rem] h-[10rem] w-[10rem]"
				/>
				<h2 className="text-2xl font-extrabold md:text-4xl text-my-yellow">
					Match History
				</h2>
			</div>
			{/* Match History Table */}
			<div className=" scrolling m-auto min-w-fit w-[80%] overflow-auto rounded-b-med">
				{/* Tabs */}
				<div className="flex">
					<h2
						className={`w-full py-4 text-2xl text-white ${
							filter === "all"
								? "bg-my-violet"
								: "bg-my-light-violet"
						} rounded-t-med cursor-pointer`}
						onClick={() => setFilter("all")}
					>
						All
					</h2>
					<h2
						className={`w-full py-4 text-2xl text-white ${
							filter === "wins"
								? "bg-my-violet"
								: "bg-my-light-violet"
						} bg-my-violet rounded-t-med cursor-pointer`}
						onClick={() => setFilter("wins")}
					>
						Wins
					</h2>
					<h2
						className={`w-full py-4 text-2xl text-white ${
							filter === "loses"
								? "bg-my-violet"
								: "bg-my-light-violet"
						} bg-my-violet rounded-t-med cursor-pointer`}
						onClick={() => setFilter("loses")}
					>
						Loses
					</h2>
				</div>
				{/* Matches */}

				{filter !== "loses" && <MatchCard result="won" />}
				{filter !== "wins" && <MatchCard result="lost" />}
				{filter !== "loses" && <MatchCard result="won" />}
				{filter !== "wins" && <MatchCard result="lost" />}
			</div>
		</div>
	);
};

export default MatchHistory;

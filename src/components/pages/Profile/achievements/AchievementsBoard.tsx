import React, { FC, useContext } from "react";
import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import AchievementIcon from "../../../../img/achievments.png";
import { userContext, UserState } from "../../../helpers/context";
import { outletContext } from "../Profile";
import AchievementCard from "./AchievementCard";

const AchievementsBoard: FC = () => {
	const navigate = useNavigate();
	const { username } = useOutletContext<outletContext>();

	const handleClick = () => {
		navigate(`/profile/${username}`);
	};
	return (
		<div className="absolute inset-0 z-10 w-full h-screen px-6 py-20 bg-my-blue md:relative md:h-full">
			{/* Back Button */}
			<i
				className="absolute text-white cursor-pointer left-5 top-15 fa-solid fa-arrow-left md:hidden"
				onClick={handleClick}
			></i>
			<div className="flex items-center justify-center gap-4 pb-4">
				<img
					src={AchievementIcon}
					alt="Achievement trophy"
					className="w-[15rem] h-[15rem]"
				/>
				<h2 className="text-4xl font-extrabold text-my-yellow">
					ACHIEVEMENTS
				</h2>
			</div>
			<div className=" scrolling justify-center min-w-fit w-[full] overflow-auto flex flex-wrap gap-2">
				<AchievementCard level="level1" />
				<AchievementCard level="level2" />
				<AchievementCard level="level3" />
				<AchievementCard level="level4" />
				<AchievementCard level="level5" />
				<AchievementCard level="level6" />
				<AchievementCard level="level7" />
				<AchievementCard level="level8" />
				<AchievementCard level="level9" />
				<AchievementCard level="level10" />
				<AchievementCard level="level11" />
				<AchievementCard level="level12" />
			</div>
		</div>
	);
};

export default AchievementsBoard;

import React, { FC } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import AchievementIcon from "../../../../img/trophy.png";
import AchievementCard from "./AchievementCard";

const AchievementsBoard: FC = () => {
	return (
		<div className="absolute inset-0 z-10 w-full h-screen px-6 py-20 bg-my-blue md:relative md:h-full">
			<div className="flex flex-col items-center justify-center gap-4 py-8">
				<img
					src={AchievementIcon}
					alt="Achievement trophy"
					className="w-[10rem] h-[10rem]"
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

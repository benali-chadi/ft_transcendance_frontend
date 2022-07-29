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
					className="w-[7rem] h-[7rem]"
				/>
				<h2 className="text-4xl font-extrabold text-my-yellow">
					ACHIEVEMENTS
				</h2>
			</div>
			<div className=" scroll justify-center min-w-fit w-[full] overflow-auto flex flex-wrap gap-2">
				<AchievementCard level="level1" />
				<AchievementCard level="level2" />
				<AchievementCard level="level3" />
			</div>
		</div>
	)
};


export default AchievementsBoard;
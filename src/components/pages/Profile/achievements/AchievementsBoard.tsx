import React, { FC } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import AchievementIcon from "../../../../img/trophy.png";
import AchievementCard from "./AchievementCard";


const AchievementsBoard: FC = () => {
		
	return (
		<div className="absolute inset-0 z-10 w-full h-screen px-6 py-20 bg-my-blue md:relative md:h-full">	
			<div className="flex items-center justify-center gap-4 py-8">
				<img
					src={AchievementIcon}
					alt="Achievement trophy"
					className="w-[7rem] h-[7rem]"
				/>
				<h2 className="text-4xl font-extrabold text-my-red">
					Achievements
				</h2>
			</div>
			<div className=" scroll m-auto min-w-fit w-[80%] overflow-auto rounded-b-med">
			
				<AchievementCard level="level1" />
				<AchievementCard level="level2" />
				<AchievementCard level="level3" />
			</div>
		</div>
	)
};


export default AchievementsBoard;
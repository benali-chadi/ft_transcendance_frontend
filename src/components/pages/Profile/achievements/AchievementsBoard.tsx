import React, { FC } from "react";
import { useNavigate, useOutletContext } from "react-router";
import AchievementIcon from "../../../../img/achievments.png";
import { outletContext } from "../Profile";
import AchievementCard from "./AchievementCard";

const Achievements = [
	{
		title:"Straight shooter",
		desc: "You've won 5 matches in a row",
		level: "level1"
	},
	{
		title: "Killer",
		desc: "Perfect score",
		level: "level2"
	},
	{
		title: "Golden boy",
		desc: "Reached 1st rank",
		level: "level3"
	},
	{
		title: "Silver king",
		desc: "Reached 2nd rank",
		level: "level4"
	},
	{
		title: "Bronze status",
		desc: "Reached 3rd rank",
		level: "level5"
	},
	{
		title: "Social animal",
		desc: "You have 5 friends",
		level: "level6"
	},
	{
		title: "it’s a kings world",
		desc: "Administrator of 5 channels",
		level: "level7"
	},
	{
		title: "Novice",
		desc: "Welcome to our website",
		level: "level8"
	},
	{
		title: "Supervisor",
		desc: "Watched a game",
		level: "level9"
	},
]

const AchievementsBoard: FC = () => {
	const navigate = useNavigate();
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
			<div className="flex items-center justify-center pb-4 md:gap-4">
				<img
					src={AchievementIcon}
					alt="Achievement trophy"
					className=" md:w-[15rem] md:h-[15rem] h-[10rem] w-[10rem]"
				/>
				<h2 className="text-2xl font-extrabold md:text-4xl text-my-yellow">
					ACHIEVEMENTS
				</h2>
			</div>
			<div className=" scrolling justify-center min-w-fit w-[full] overflow-auto flex flex-wrap gap-2">
				
				{
					Achievements.map((element, index) => {
						return <AchievementCard 
						key={index}
						title={element.title} 
						desc={element.desc} 
						level={element.level}/>
					})	
				}
			</div>
		</div>
	);
};

export default AchievementsBoard;

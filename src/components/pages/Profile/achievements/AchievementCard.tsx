import React, { FC } from "react";
import { useContext } from "react";
import { userContext } from "../../../helpers/context";
// import pongRackets from "../../../../img/table-tennis.png";
import { UserState } from "../../../helpers/context";

interface Props {
	level: string,
}

const AchievementCard: FC<Props> = ({level}) => {

	//const { user } = useContext<UserState>(userContext);

	return (
		
		<div
		className={`py-2 w-[30%] min-w-[10rem]  bg-my-violet flex justify-center gap-[2%] rounded-lg `}>
			<img
				src={`/achievements/${level}.png`}
				alt={level}
				className="w-[4rem] h-[4rem] rounded-full"
			/>
			{/* text align-center */}
			<h3 className="text text-my-yellow  mt-1 self-start">{level}</h3>
		</div>
	);
}

export default AchievementCard;
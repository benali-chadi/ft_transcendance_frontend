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
		
		<div className={`p-2 w-[30%] min-w-max  bg-my-violet flex justify-center rounded-lg `}>
			<img
				src={`/achievements/${level}.png`}
				alt={level}
				className="w-[4rem] h-[4rem] rounded-full self-center"
			/>
			{/* text align-center */}
			{/* <h3 className="text-xl text-my-yellow  mt-1 self-start">{level}</h3> */}
			<div className="">
				<h4 className="text-[1.2rem] text-my-yellow  mt-1 self-start">ACHIVEMENT TITLE</h4>
				<p className="text-xs  text-white"  >Description of the achievement</p>
			</div>

		</div>
	);
}

export default AchievementCard;
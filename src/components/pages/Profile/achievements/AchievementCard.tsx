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
		className={`px-6 py-3 bg-white flex justify-center gap-[10%] border border-black`}>
			<img
				src={`/achievements/${level}.png`}
				alt={level}
				className="w-[4rem] h-[4rem] rounded-full"
			/>
		</div>
	);
}

export default AchievementCard;
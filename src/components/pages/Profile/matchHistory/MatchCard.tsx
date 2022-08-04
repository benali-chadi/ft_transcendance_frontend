import React, { FC } from "react";
import pongRackets from "../../../../img/table-tennis.png";
import { useOutletContext } from "react-router-dom";
import { outletContext } from "../Profile";

// bg-gradient-to-r from-[#D8E3F7] to-[#E4CFBA]

interface Props {
	result: string;
	handleClick?: (user: any) => void;
}

const MatchCard: FC<Props> = ({ /*user1, user2, */ result, handleClick }) => {
	// const { currentUser } = useContext<UserState>(userContext);
	const { profileUser } = useOutletContext<outletContext>();

	const lostBgStyle = "bg-gradient-to-b from-[#EC1B24] to-[#D37C80]";
	const winBgStyle = "bg-gradient-to-b from-[#1FAC49] to-[#72CF8E]";

	return (
		<div
			className={`px-6 py-3 ${
				result === "lost" ? lostBgStyle : winBgStyle
			} flex justify-center gap-[10%] border-t-4 border-my-violet`}
		>
			{/* User 1 */}
			<div
				className="min-h-[4rem] min-w-[4rem] rounded-full flex justify-center items-center gap-4 cursor-pointer"
				onClick={() => {
					if (handleClick) handleClick(profileUser);
				}}
			>
				{profileUser.avatar && (
					<img
						src={profileUser.avatar}
						alt="avatar"
						className="w-[4rem] h-[4rem] rounded-full"
					/>
				)}
			</div>

			{/* Result Part */}
			<div className="flex flex-col items-center justify-center">
				<img
					src={pongRackets}
					alt="Ping-pong Rackets"
					className="w-[2rem] h-[2rem]"
				/>

				<h3 className="text-xl">You {result}</h3>
			</div>

			{/* user 2 */}
			<div
				className="min-h-[4rem] min-w-[4rem] rounded-full flex justify-center items-center gap-4 cursor-pointer"
				onClick={() => {
					if (handleClick) handleClick(profileUser);
				}}
			>
				{profileUser.avatar && (
					<img
						src={profileUser.avatar}
						alt="avatar"
						className="w-[4rem] h-[4rem] rounded-full"
					/>
				)}
			</div>
		</div>
	);
};

export default MatchCard;

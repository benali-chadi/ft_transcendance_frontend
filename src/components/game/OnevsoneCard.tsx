import React, { FC } from "react";
import { useOutletContext } from "react-router-dom";

// interface Props {
// 	// result: string;
//     user1: any,
//     user2: any,
//     score1: number,
//     score2: number,
// }

interface Props {
	username1: string;
	username2: string;
	score1: number;
	score2: number;
	avatar1: string;
	avatar2: string;
}

const OnevsoneCard: FC<Props> = ({
	/*user1, user2*/ username1,
	username2,
	score1,
	score2,
	avatar1,
	avatar2,
}) => {
	return (
		<div
			className={`p-1.5 m-1 flex justify-center gap-[10%] bg-my-yellow rounded-xl shadow-lg w-[90%]`}
		>
			{/* User 1 */}
			<div>
				<div className="min-h-[4rem] min-w-[4rem] rounded-full flex justify-center items-center gap-4">
					{avatar1 && (
						<img
							src={avatar1}
							alt="avatar"
							className="w-[4rem] h-[4rem] rounded-full"
						/>
					)}
				</div>
				<h2 className="text-lg font-medium ">{username1}</h2>
			</div>

			{/* Score */}
			<div className="flex flex-col items-center justify-center">
				<h1 className="text-[3rem] font-bold w-max">
					{score1} - {score2}
				</h1>
			</div>

			{/* User 2 */}
			<div>
				<div className="min-h-[4rem] min-w-[4rem] rounded-full flex justify-center items-center gap-4">
					{avatar2 && (
						<img
							src={avatar2}
							alt="avatar"
							className="w-[4rem] h-[4rem] rounded-full"
						/>
					)}
				</div>
				<h2 className="text-lg font-medium ">{username2}</h2>
			</div>
		</div>
	);
};

export default OnevsoneCard;

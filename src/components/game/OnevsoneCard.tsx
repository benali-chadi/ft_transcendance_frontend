import React, { FC } from "react";
import { useOutletContext } from "react-router-dom";

// bg-gradient-to-r from-[#D8E3F7] to-[#E4CFBA]

// interface Props {
// 	// result: string;
//     user1: any,
//     user2: any,
//     score1: number,
//     score2: number,
// }
interface Props {
    username1: string,
    username2: string,
    score1: number,
    score2: number,
    avatar1: string,
    avatar2: string,
}

const OnevsoneCard: FC<Props> = ({ /*user1, user2*/ username1, username2, score1, score2, avatar1, avatar2 }) => {

	return (
		<div
			className={`p-4 px-8 flex justify-center gap-[10%] bg-my-blue rounded-xl shadow-lg w-max`}
		>
			{/* User 1 */}
            <div className="px-4">
                <div
                    className="min-h-[4rem] min-w-[4rem] rounded-full flex justify-center items-center gap-4"
                >
                    {avatar1 && (
                        <img
                            src={avatar1}
                            alt="avatar"
                            className="w-[4rem] h-[4rem] rounded-full"
                        />
                    )}
                </div>
                <h2 className=" font-medium text-lg">{username1}</h2>

            </div>

			{/* Score */}
			<div className="flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold w-max">{score1} - {score2}</h1>
			</div>

			{/* User 2 */}
            <div className="px-4">
                <div
                    className="min-h-[4rem] min-w-[4rem] rounded-full flex justify-center items-center gap-4"
                >
                    {avatar2 && (
                        <img
                            src={avatar2}
                            alt="avatar"
                            className="w-[4rem] h-[4rem] rounded-full"
                        />
                    )}
                </div>
                <h2 className=" font-medium text-lg">{username2}</h2>

            </div>
		</div>
	);
};

export default OnevsoneCard;

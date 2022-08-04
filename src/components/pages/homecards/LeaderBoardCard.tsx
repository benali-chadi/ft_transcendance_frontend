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
    username: string,
    avatar: string,
}

const LeaderBoardCard: FC<Props> = ({ /*user1, user2*/ username, avatar}) => {

	return (
		<div
			className={`p-1.5 m-1 flex justify-center gap-[10%] bg-my-green rounded-xl shadow-lg w-[90%]`}
		>
			{/* User CARD*/}
            <div>
                <div
                    className="min-h-[4rem] min-w-[4rem] rounded-full flex  justify-center items-center gap-4"
                >
                    {avatar && (
                        <img
                            src={avatar}
                            alt="avatar"
                            className="w-[4rem] h-[4rem] rounded-full"
                        />
                    )}
                </div>
                <h2 className=" font-medium text-lg">{username}</h2>
            
            </div>
		</div>
	);
};

export default LeaderBoardCard;

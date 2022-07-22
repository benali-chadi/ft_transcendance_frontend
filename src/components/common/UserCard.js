import React, { useContext } from "react";
import { userContext } from "../helpers/context";

const UserCard = () => {
	const { user } = useContext(userContext);

	return (
		<div className="flex flex-col items-center gap-2 min-w-[15rem] max-w-lg m-auto">
			<div className="min-h-[5rem] min-w-[5rem] w-[40%] h-[40%] rounded-full bg-gray-300 flex justify-center">
				{user.avatar && (
					<img
						src={user.avatar}
						alt="avatar"
						className="w-full h-full rounded-full"
					/>
				)}
			</div>
			<div className="self-stretch">
				<h3 className="text-xl text-center">{user.username}</h3>
				{/* <div className="text-lg">level</div> */}
				{/* Ladder level */}
				<div className="relative self-stretch w-full mt-2 bg-gray-300 h-9 rounded-med">
					<p className="absolute text-base left-[40%] top-[10%]">
						level 4 - 70%
					</p>
					<div className="w-[70%] bg-my-yellow h-full rounded-med flex"></div>
				</div>
			</div>
		</div>
	);
};

export default UserCard;

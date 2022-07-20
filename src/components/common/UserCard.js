import React, { useContext } from "react";
import { userContext } from "../helpers/context";

const UserCard = () => {
	const { user } = useContext(userContext);

	return (
		<div className="flex flex-col items-center px-4 py-2 min-w-[15rem] max-w-lg m-auto">
			<div className="min-h-[5rem] min-w-[5rem] w-[50%] h-[50%] rounded-full bg-gray-300 flex justify-center">
				{user.avatar && (
					<img
						src={user.avatar}
						alt="avatar"
						className="w-[5rem] h-[5rem] rounded-full"
					/>
				)}
			</div>
			<div className="self-stretch text-left">
				<h3 className="text-xl text-center">{user.username}</h3>
				{/* <div className="text-lg">level</div> */}
				{/* Ladder level */}
				<div className="relative self-stretch w-full h-9 bg-my-lavender rounded-med">
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

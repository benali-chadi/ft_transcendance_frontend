import React, { useContext } from "react";
import { userContext } from "../helpers/context";

const UserCard = () => {
	const { user } = useContext(userContext);

	return (
		<div className="flex gap-4 px-4 py-2 bg-white/50 rounded-med">
			<div className="min-h-[5rem] min-w-[5rem] rounded-full bg-gray-300 flex justify-center">
				{user.avatar && (
					<img
						src={user.avatar}
						alt="avatar"
						className="w-[5rem] h-[5rem] rounded-full"
					/>
				)}
			</div>
			<div className="text-left">
				<h3 className="text-xl">{user.username}</h3>
				<div className="text-lg">level</div>
			</div>
		</div>
	);
};

export default UserCard;

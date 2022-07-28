import React, { FC, useContext, useEffect } from "react";
import { useState } from "react";
import { UserState } from "../helpers/context";
import { userContext } from "../helpers/context";
import UpdateUser from "../pages/login/UpdateUser";

interface Props {
	user: {
		id: number;
		username: string;
		avatar: string;
	};
}

const UserCard: FC<Props> = ({ user }) => {
	const { currentUser } = useContext<UserState>(userContext);
	const [showUpdateUser, setShowUpdateUser] = useState(false);

	const cond = user.username === currentUser.username;

	return (
		<div className="flex flex-col items-center gap-2 min-w-[15rem] max-w-lg m-auto">
			{showUpdateUser && (
				<UpdateUser
					handleCancelClick={() => setShowUpdateUser(!showUpdateUser)}
				/>
			)}
			<div
				className={`min-h-[8rem] min-w-[8rem] rounded-full bg-gray-300 flex justify-center ${
					cond ? "cursor-pointer hover:opacity-80" : ""
				}`}
				onClick={() => {
					if (cond) setShowUpdateUser(!showUpdateUser);
				}}
			>
				{user.avatar && (
					<img
						src={user.avatar}
						alt="avatar"
						className="w-[8rem] h-[8rem] rounded-full"
					/>
				)}
			</div>
			<div className="self-stretch">
				<h3 className="text-xl text-center text-my-blue">
					{user.username}
				</h3>
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

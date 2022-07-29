import React, { FC, useState } from "react";
import { motion } from "framer-motion";
// @ts-ignore
import { threeDotsVariants } from "../../helpers/variants";

interface Props {
	user: any,
	status: string,
	room_id: number,
	handleClick: (user: any, room_id: number) => void
}

const ChatUserCard: FC<Props> = ({ user, status, handleClick = () => {}, room_id }) => {
	const [showDropDown, setShowDropdown] = useState(false);

	return (
		<div className="flex justify-around px-5 pb-2 rounded-xl hover:bg-my-light-violet/30 hover:shadow-md md:pb-0">
			{/* Avatar Part */}
			<div
				className="min-h-[3rem] min-w-[3rem] md:w-[2rem] md:h-[2rem] rounded-full flex justify-center items-center gap-1 cursor-pointer"
				onClick={() => {
					setShowDropdown(false);
					handleClick(user, room_id);
				}}
			>
				{user.avatar && (
					<img
						src={user.avatar}
						alt="avatar"
						className="w-[3rem] h-[3rem] rounded-full md:w-[2rem] md:h-[2rem]"
					/>
				)}
				{/* Text Part */}
				<div className="text-left">
					<h3 className="text-xl">{user.username}</h3>
					<div className="text-sm font-semibold">{status}</div>
				</div>
			</div>
			{/* Three Dots Part */}
			<div className="relative flex flex-col">
				<i
					className="text-xl rounded-full cursor-pointer fa-solid fa-ellipsis-vertical hover:bg-gray-100 w-[2rem] self-end"
					onClick={() => setShowDropdown(!showDropDown)}
				></i>
				<motion.div
					variants={threeDotsVariants}
					animate={showDropDown ? "open" : "close"}
					className={`p-2 text-sm font-light bg-white rounded-xl absolute z-10 top-[25px] left-[-1rem] w-max`}
				>
					<p
						className="pb-1 border-b-[1px] border-black/50 cursor-pointer hover:bg-gray-100 rounded-md rounded-b-none p-1 font-normal"
						onClick={() => setShowDropdown(false)}
					>
						Invite for a game
					</p>
					<p
						className="p-1 font-normal cursor-pointer hover:bg-gray-100"
						onClick={() => {
							setShowDropdown(false);
							window.alert("YOU WANT TO BLOCK ME?!");
						}}
					>
						Block User
					</p>
				</motion.div>
			</div>
		</div>
	);
};

export default ChatUserCard;

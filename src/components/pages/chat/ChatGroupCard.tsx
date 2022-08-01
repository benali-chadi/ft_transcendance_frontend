import React, { FC, useState } from "react";
import { motion } from "framer-motion";
// @ts-ignore
import { threeDotsVariants } from "../../helpers/variants";

interface Props {
	room_id: number,
    room:any
	handleClick: (room: any, room_id: number) => void
}

const ChatGroupCard: FC<Props> = ({ room, handleClick = () => {}, room_id }) => {
	const [showDropDown, setShowDropdown] = useState(false);

	return (
		<div className="flex justify-around px-5 pb-2 rounded-xl hover:bg-my-light-violet/30 hover:shadow-md md:pb-0">
			{/* Avatar Part */}
			<div
				className="min-h-[3rem] min-w-[3rem] md:w-[2rem] md:h-[2rem] rounded-full flex justify-center items-center gap-1 cursor-pointer"
				onClick={() => {
					setShowDropdown(false);
					handleClick(room, room_id);
				}}
			>
				{room.icon && (
					<img
						src={room.icon}
						alt="icon"
						className="w-[3rem] h-[3rem] rounded-full md:w-[2rem] md:h-[2rem]"
					/>
                )}
				{/* Text Part */}
				<div className="text-left">
					<h3 className="text-xl">{room.name}</h3>
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
						See members
					</p>
					<p
						className="p-1 font-normal cursor-pointer hover:bg-gray-100"
						onClick={() => {
							setShowDropdown(false);
							window.alert("YOU WANT TO BLOCK ME?!");
						}}
					>
						Leave room
					</p>
				</motion.div>
			</div>
		</div>
	);
};

export default ChatGroupCard;

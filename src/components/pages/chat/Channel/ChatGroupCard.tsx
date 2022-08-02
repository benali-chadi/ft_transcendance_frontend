import React, { FC, useContext, useState } from "react";
import { motion } from "framer-motion";
// @ts-ignore
import { threeDotsVariants } from "../../../helpers/variants";
import axios from "axios";
import env from "react-dotenv";
import ChannelMembers from "./ChannelMembers";
import { ChatContext, ChatState } from "../../../helpers/context";

interface Props {
	room_id: number;
	room: any;
	handleClick?: (room: any, room_id: number) => void;
}

const ChatGroupCard: FC<Props> = ({
	room,
	handleClick = () => {},
	room_id,
}) => {
	const [showDropDown, setShowDropdown] = useState(false);
	const [showMembers, setShowMembers] = useState(false);
	const [inChannel, setInChannel] = useState(room.In);

	const { channels, setChannels } = useContext<ChatState>(ChatContext);

	const handleJoinClick = async () => {
		setShowDropdown(false);
		try {
			const { data } = await axios.post(
				`${process.env.REACT_APP_BACKEND_URL}chat/join_room`,
				{ room_id: room_id, password: null },
				{ withCredentials: true }
			);
			let tempChatUser = [...channels];
			console.log("temp =", tempChatUser);
			tempChatUser[room_id].In = true;

			setChannels(tempChatUser);
			// console.log(data);
			setInChannel(channels.In);
		} catch (e) {
			console.log(e);
		}
	};
	const handleLeaveClick = async () => {
		setShowDropdown(false);
		try {
			const { data } = await axios.post(
				`${process.env.REACT_APP_BACKEND_URL}chat/leave_room`,
				{ room_id: room_id },
				{ withCredentials: true }
			);

			let tempChatUser = [...channels];
			console.log("temp =", tempChatUser);
			tempChatUser[room_id].In = false;

			setChannels(tempChatUser);
			console.log(channels.In);
			setInChannel(channels.In);
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<div className="flex bg-white justify-around p-4 w-full rounded-xl hover:bg-my-light-violet/30 hover:shadow-md min-w-[15rem]">
			{/* Showing Channel's Memebers */}
			{showMembers && (
				<ChannelMembers
					members={room.members}
					handleCancel={(): any => setShowMembers(false)}
					ChannelName={room.name}
				/>
			)}
			{/* Avatar Part */}
			<div
				className="min-h-[3rem] min-w-[3rem] rounded-full flex justify-center items-center gap-2 cursor-pointer"
				onClick={() => {
					setShowDropdown(false);
					handleClick(room, room_id);
				}}
			>
				{room.icon && (
					<img
						src={room.icon}
						alt="icon"
						className="w-[3rem] h-[3rem] rounded-full"
					/>
				)}
				{/* Text Part */}
				<div className="text-left">
					<h3 className="text-xl">{room.name}</h3>
				</div>
			</div>
			{/* Three Dots Part */}
			<div className="relative flex flex-col">
				<div
					className="hover:bg-gray-100 w-[2rem] cursor-pointer rounded-full flex justify-center items-center"
					onClick={() => setShowDropdown(!showDropDown)}
				>
					<i className="text-xl fa-solid fa-ellipsis-vertical "></i>
				</div>
				<motion.div
					variants={threeDotsVariants}
					animate={showDropDown ? "open" : "close"}
					className={`p-2 text-sm font-light bg-white rounded-xl absolute z-10 top-[25px] left-[-3rem] w-max`}
				>
					<p
						className="pb-1 border-b-[1px] border-black/50 cursor-pointer hover:bg-gray-100 rounded-md rounded-b-none p-1 font-normal"
						onClick={() => {
							setShowDropdown(false);
							setShowMembers(true);
						}}
					>
						See members
					</p>
					{inChannel ? (
						<p
							className="p-1 font-normal cursor-pointer hover:bg-gray-100"
							onClick={handleLeaveClick}
						>
							Leave room
						</p>
					) : (
						<p
							className="p-1 font-normal cursor-pointer hover:bg-gray-100"
							onClick={handleJoinClick}
						>
							Join room
						</p>
					)}
				</motion.div>
			</div>
		</div>
	);
};

export default ChatGroupCard;

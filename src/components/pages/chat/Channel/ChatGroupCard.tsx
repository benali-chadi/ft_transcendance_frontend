import React, { FC, useContext, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
// @ts-ignore
import { threeDotsVariants } from "../../../helpers/variants";
import axios from "axios";
import ChannelMembers from "./ChannelMembers";
import { ChatContext, ChatState } from "../../../helpers/context";
import ChannelSettings from "./channelSettings/ChannelSettings";

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
	const [showSetting, setShowSettings] = useState(false);

	const { channelUpdated, setcChannelUpdated } =
		useContext<ChatState>(ChatContext);
	const ref: any = useRef();

	const handleJoinClick = async () => {
		setShowDropdown(false);
		try {
			const { data } = await axios.post(
				`${process.env.REACT_APP_BACKEND_URL}chat/join_room`,
				{ room_id: room_id, password: null },
				{ withCredentials: true }
			);
			setcChannelUpdated(channelUpdated + 1);
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
			setcChannelUpdated(channelUpdated + 1);
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		function handleClickOutside(event) {
			if (ref.current && !ref.current.contains(event.target)) {
				setShowDropdown(false);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			// Unbind the event listener on clean up
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [ref]);

	return (
		<div
			ref={ref}
			className="grid grid-cols-[4fr_1fr] bg-white p-4 w-full rounded-xl hover:bg-my-light-violet/30 hover:shadow-md min-w-[15rem]"
		>
			{/* Showing Channel's Memebers */}
			{showMembers && (
				<ChannelMembers
					members={room.members}
					handleCancel={(): any => setShowMembers(false)}
					ChannelName={room.name}
				/>
			)}
			{showSetting && (
				<ChannelSettings
					room_id={room_id}
					channelName={room.name}
					handleCancel={() => setShowSettings(false)}
				/>
			)}
			{/* Avatar Part */}
			<div
				className=" min-h-[3.5rem] min-w-[3.5rem] rounded-full flex items-center gap-2 cursor-pointer"
				onClick={() => {
					setShowDropdown(false);
					handleClick(room, room_id);
				}}
			>
				{room.icon && (
					<img
						src={`${process.env.REACT_APP_BACKEND_URL}${room.icon}`}
						alt="icon"
						className="w-[3.5rem] h-[3.5rem] rounded-full"
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
					className={`p-2 text-sm font-light bg-white rounded-xl absolute z-10 top-[25px] left-[-5rem] w-max`}
				>
					<p
						className="p-1 pb-1 font-normal rounded-md rounded-b-none cursor-pointer hover:bg-gray-100"
						onClick={() => {
							setShowDropdown(false);
							setShowMembers(true);
						}}
					>
						See members
					</p>
					{room.role === "Admin" || room.role === "Owner" ? (
						<div>
							<p
								className="p-1 border-b-[1px] border-black/50 font-normal cursor-pointer hover:bg-gray-100"
								onClick={() => setShowSettings(true)}
							>
								Channel's settings
							</p>
						</div>
					) : (
						<div></div>
					)}
					{room.In ? (
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

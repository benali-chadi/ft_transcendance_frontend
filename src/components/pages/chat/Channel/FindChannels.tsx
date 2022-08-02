import axios from "axios";
import { motion } from "framer-motion";
import env from "react-dotenv";
import React, { useState } from "react";
import { useEffect } from "react";
import { FC } from "react";
import Modal from "../../../common/Modal";
import ChatUserCard from "../Inbox/ChatUserCard";
import ChatGroupCard from "./ChatGroupCard";
interface Props {
	handleCancel: () => void;
}

const FindChannels: FC<Props> = ({ handleCancel }) => {
	const [channels, setChannels] = useState([]);
	const [text, setText] = useState("");

	useEffect(() => {
		async function showGroups() {
			try {
				const { data } = await axios.get(
					`${process.env.REACT_APP_BACKEND_URL}chat/all_channels`,
					{
						withCredentials: true,
					}
				);
				setChannels(data);
			} catch (e) {}
		}
		showGroups();
	}, []);

	return (
		<Modal>
			<div className="absolute top-0 z-40 flex items-center justify-center w-screen h-screen bg-black/80">
				<div
					className="absolute top-0 w-screen h-screen cursor-pointer"
					onClick={handleCancel}
				></div>
				<motion.div
					initial={{ x: "-100vw" }}
					animate={{ x: 0 }}
					transition={{ type: "spring", stiffness: 120 }}
					exit={{
						x: "100vw",
						transition: { type: "tween", duration: 0.5 },
					}}
					className="h-[50%] min-h-[30rem] w-[50%] min-w-fit overflow-auto bg-my-lavender p-4 flex flex-col rounded-xl shadow-lg relative"
				>
					{/* Close Icon */}
					<div
						className="absolute text-2xl cursor-pointer right-4 hover:opacity-70"
						onClick={handleCancel}
					>
						<i className="fa-solid fa-xmark"></i>
					</div>
					{/* Search area */}
					<div className="flex items-center p-4 self-center bg-white h-fit rounded-large w-[70%] mb-4">
						<i className="fa-solid fa-magnifying-glass text-[#655E5E] text-xl"></i>
						<input
							type="text"
							value={text}
							onChange={(e) => setText(e.target.value)}
							className="h-6 max-w-[15rem] w-full p-2 text-xl rounded-large font-Poppins"
							placeholder="Search..."
						/>
					</div>
					{/* channels */}
					<div className="flex flex-wrap justify-center gap-2">
						{channels.length != 0 ? (
							channels.map((channel: any) => {
								return (
									<ChatGroupCard
										key={channel.id}
										room={channel}
										room_id={channel.id}
									/>
								);
								return <div></div>;
							})
						) : (
							<h1>No channels</h1>
						)}
					</div>
				</motion.div>
			</div>
		</Modal>
	);
};

export default FindChannels;

import { motion } from "framer-motion";
import React, { FC, useContext, useState } from "react";
import Modal from "../../../../common/Modal";
import { cardVariants } from "../../../../helpers/variants";
import EditChannelInfo from "./EditChannelInfo";
import EditMembers from "./EditMembers";
import { userContext, UserState } from "../../../../helpers/context";
import axios from "axios";

interface Props {
	room_id: number;
	channelName: string;
	handleCancel: () => void;
}

const ChannelSettings: FC<Props> = ({ handleCancel, channelName, room_id }) => {
	const [toShow, setToShow] = useState<
		"" | "edit" | "add" | "member" | "unban"
	>("");
	const { isMobile } = useContext<UserState>(userContext);

	const handleDeleteChannelClick = async () => {
		try {
			let { data } = await axios.delete(
				`${process.env.REACT_APP_BACKEND_URL}chat/${room_id}`,
				{
					withCredentials: true,
				}
			);
		} catch (e) {
			console.log(e);
		}
	};

	const handleCancelClick = () => {
		setToShow("");
	};

	return (
		<Modal>
			<div className="absolute top-0 z-40 flex items-center justify-center w-screen h-screen bg-black/80">
				<div
					className="absolute top-0 w-screen h-screen cursor-pointer"
					onClick={handleCancel}
				></div>
				<motion.div
					variants={cardVariants}
					initial="initial"
					animate="animate"
					exit="exit"
					className="scrolling h-[40%] min-h-[30rem] w-[60%] min-w-fit overflow-auto bg-white flex flex-col justify-between rounded-xl shadow-lg"
				>
					{/* Head Part */}
					<div className="sticky top-0 flex items-center justify-between p-4 shadow-md bg-my-lavender ">
						<h1 className="text-xl font-bold">
							{channelName} Settings
						</h1>
						<i
							className="text-4xl cursor-pointer fa-solid fa-xmark text-my-violet hover:opacity-60"
							onClick={handleCancel}
						></i>
					</div>
					{/* Main Part */}
					<div className="h-full bg-my-lavender min-h-max md:grid md:grid-cols-[1.5fr_4fr] md:grid-rows-1">
						{/* Side Bar */}
						<div
							className={`h-full flex flex-col justify-between md:shadow-lg z-10 ${
								toShow !== "" && isMobile ? "hidden" : ""
							}`}
						>
							<div>
								<div
									className={`p-4 cursor-pointer ${
										toShow === "edit"
											? "bg-gray-300"
											: "bg-white hover:bg-gray-200"
									}`}
									onClick={() => setToShow("edit")}
								>
									<h2>edit channel info</h2>
								</div>
								<div
									className={`p-4 cursor-pointer ${
										toShow === "member"
											? "bg-gray-300"
											: "bg-white hover:bg-gray-200"
									}`}
									onClick={() => setToShow("member")}
								>
									<h2>members settings</h2>
								</div>
								<div
									className={`p-4 cursor-pointer ${
										toShow === "unban"
											? "bg-gray-300"
											: "bg-white hover:bg-gray-200"
									}`}
									onClick={() => setToShow("unban")}
								>
									<h2>banned members</h2>
								</div>
								<div
									className={`p-4 cursor-pointer ${
										toShow === "add"
											? "bg-gray-300"
											: "bg-white hover:bg-gray-200"
									}`}
									onClick={() => setToShow("add")}
								>
									<h2>add members</h2>
								</div>
							</div>

							<div
								className={`p-4 text-white rounded-lg cursor-pointer bg-my-red hover:bg-red-500 text-center`}
								onClick={handleDeleteChannelClick}
							>
								<h2>delete channel</h2>
							</div>
						</div>
						{/* Setting Part */}
						<div className="h-full ">
							{toShow === "edit" && (
								<EditChannelInfo
									handleCancelClick={handleCancelClick}
									room_id={room_id}
								/>
							)}
							{toShow === "add" && (
								<EditMembers
									handleCancel={handleCancelClick}
									room_id={room_id}
									members={false}
									unban={false}
								/>
							)}
							{toShow === "member" && (
								<EditMembers
									handleCancel={handleCancelClick}
									room_id={room_id}
									members={true}
									unban={false}
								/>
							)}
							{toShow === "unban" && (
								<EditMembers
									handleCancel={handleCancelClick}
									room_id={room_id}
									members={true}
									unban={true}
								/>
							)}
						</div>
					</div>
				</motion.div>
			</div>
		</Modal>
	);
};

export default ChannelSettings;

import React, { FC, useState } from "react";
import { motion } from "framer-motion";
// @ts-ignore
import { threeDotsVariants } from "../../../helpers/variants";
import { useNavigate, useOutletContext } from "react-router-dom";
import { outletContext } from "../Profile";
import axios from "axios";

interface Props {
	user: any;
}

const FriendCard: FC<Props> = ({ user }) => {
	const navigate = useNavigate();
	const [showDropDown, setShowDropdown] = useState(false);
	// const { setProfileUser } = useOutletContext<outletContext>();

	const [blocked, setBlocked] = useState(user.blocked);

	// const { setProfileUser } = useOutletContext<outletContext>();

	return (
		<div className="flex flex-shrink-0 justify-around w-fit p-4 bg-white rounded-xl hover:bg-white/50 hover:shadow-lg min-w-[15rem]">
			{/* Avatar Part */}
			<div
				className="min-h-[3rem] min-w-[3rem] rounded-full flex justify-center items-center gap-4 cursor-pointer"
				onClick={() => {
					setShowDropdown(false);
					// setProfileUser(user);
					navigate(`/profile/${user.username}`);
					// handleClick(user);
				}}
			>
				{user.avatar && (
					<img
						src={user.avatar}
						alt="avatar"
						className="w-[3rem] h-[3rem] rounded-full"
					/>
				)}
				{/* Text Part */}
				<div className="text-left">
					<h3 className="text-xl">{user.username}</h3>
					<div className="text-sm font-semibold">{user.status}</div>
				</div>
			</div>
			{/* Three Dots Part */}
			<div className="relative flex flex-col">
				<i
					className="text-xl rounded-full cursor-pointer fa-solid fa-ellipsis-vertical hover:bg-gray-100 w-[2rem] self-end"
					onClick={() => setShowDropdown(!showDropDown)}
				></i>

				{!blocked ? (
					<motion.div
						variants={threeDotsVariants}
						animate={showDropDown ? "open" : "close"}
						className={`p-2 text-sm font-light bg-white rounded-xl absolute z-10 top-[25px] left-[-3rem] w-max`}
					>
						<p
							className="pb-1 border-b-[1px] border-black/50 cursor-pointer hover:bg-gray-100 rounded-md rounded-b-none p-1 font-normal"
							onClick={() => setShowDropdown(false)}
						>
							Invite for a game
						</p>
						<p
							className="p-1 font-normal cursor-pointer hover:bg-gray-100"
							onClick={async () => {
								setShowDropdown(false);
								if (window.confirm("YOU WANT TO BLOCK ME?!")) {
									const { data } = await axios.post(
										"http://localhost:3000/user/block_user",
										{ to_block: user.id },
										{ withCredentials: true }
									);
									console.log(data);
									setBlocked(data.blocked);
								}
							}}
						>
							Block User
						</p>
					</motion.div>
				) : (
					<motion.div
						variants={threeDotsVariants}
						animate={showDropDown ? "open" : "close"}
						className={`p-2 text-sm font-light bg-white rounded-xl absolute z-10 top-[25px] left-[-3rem] w-max`}
					>
						<p
							className="pb-1 border-b-[1px] border-black/50 cursor-pointer hover:bg-gray-100 rounded-md rounded-b-none p-1 font-normal"
							onClick={async () => {
								setShowDropdown(false);
								if (
									window.confirm("YOU WANT TO UNBLOCK ME?!")
								) {
									const { data } = await axios.post(
										"http://localhost:3000/user/unblock_user",
										{ to_unblock: user.id },
										{ withCredentials: true }
									);
									console.log(data);
									setBlocked(data.blocked);
								}
							}}
						>
							Unblock
						</p>
					</motion.div>
				)}
			</div>
		</div>
	);
};

export default FriendCard;

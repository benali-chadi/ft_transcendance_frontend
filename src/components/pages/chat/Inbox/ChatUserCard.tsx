import React, { FC, useContext, useEffect, useRef, useState } from "react";
import { motion, useForceUpdate } from "framer-motion";
// @ts-ignore
import { threeDotsVariants } from "../../../helpers/variants";
import { useNavigate } from "react-router-dom";
import { userContext, UserState } from "../../../helpers/context";
import axios from "axios";
import HandleBlock from "../../../common/HandleBlock";

interface Props {
	user: any;
	room_id: number;
	handleClick: (user: any, room_id: number) => void;
}

const ChatUserCard: FC<Props> = ({ user, handleClick = () => {}, room_id }) => {
	const { userSocket, updated } = useContext<UserState>(userContext);
	const [showDropDown, setShowDropdown] = useState(false);
	const navigate = useNavigate();
	const [_user, setUser] = useState(user);

	const [blocked, setBlocked] = useState(_user.blocked);
	const [showYouSure, setYouSure] = useState(false);

	const ref: any = useRef();

	async function getUser() {
		try {
			const { data } = await axios.get(
				`${process.env.REACT_APP_BACKEND_URL}user/${_user.username}`,
				{ withCredentials: true }
			);
			setUser(data);
		} catch (e) {}
	}

	useEffect(() => {
		getUser();
	}, [updated]);

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
			className="flex justify-around p-4 rounded-xl hover:bg-my-light-violet/30 hover:shadow-md"
		>
			{/* Avatar Part */}
			<div
				className="min-h-[3rem] min-w-[3rem] rounded-full flex justify-center items-center gap-1 cursor-pointer"
				onClick={() => {
					setShowDropdown(false);
					handleClick(_user, room_id);
				}}
			>
				{_user.avatar && (
					<img
						src={_user.avatar}
						alt="avatar"
						className="w-[3rem] h-[3rem] rounded-full"
					/>
				)}
				{/* Text Part */}
				<div className="text-left">
					<h3 className="text-xl">{_user.username}</h3>
					<div className="text-sm font-semibold">{_user.status}</div>
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
					className={`p-2 text-sm font-light bg-white rounded-xl absolute z-10 top-[25px] left-[-5rem] w-max`}
				>
					<p
						className="pb-1 border-b-[1px] border-black/50 cursor-pointer hover:bg-gray-100 rounded-md rounded-b-none p-1 font-normal"
						onClick={() => {
							setShowDropdown(false);
							navigate(`/profile/${_user.username}`);
						}}
					>
						Go to Profile
					</p>
					{!blocked ? (
						<>
							<p
								className="pb-1 border-b-[1px] border-black/50 cursor-pointer hover:bg-gray-100 rounded-md rounded-b-none p-1 font-normal"
								onClick={() => setShowDropdown(false)}
							>
								Invite for a game
							</p>
							<p
								className="p-1 font-normal cursor-pointer hover:bg-gray-100"
								onClick={async () => {
									setYouSure(true);
								}}
							>
								Block User
							</p>
							{showYouSure && (
								<HandleBlock
									handleYesClick={() => {
										setYouSure(false);
										setShowDropdown(false);
										userSocket?.emit(
											"relation status",
											{
												id: _user.id,
												to_do: "block_user",
											},
											(res) => {
												setBlocked((prev) => {
													return res.blocked;
												});
											}
										);
									}}
									handleNoClick={() => {
										setYouSure(false);
										// setShowDropdown(false);
									}}
								/>
							)}
						</>
					) : (
						<>
							<p
								className="pb-1 border-b-[1px] border-black/50 cursor-pointer hover:bg-gray-100 rounded-md rounded-b-none p-1 font-normal"
								onClick={async () => {
									setYouSure(true);
								}}
							>
								Unblock
							</p>
							{showYouSure && (
								<HandleBlock
									handleYesClick={() => {
										setYouSure(false);
										setShowDropdown(false);
										userSocket?.emit(
											"relation status",
											{
												id: _user.id,
												to_do: "unblock_user",
											},
											(res) => {
												setBlocked((prev) => {
													return res.blocked;
												});
											}
										);
									}}
									handleNoClick={() => {
										setYouSure(false);
										// setShowDropdown(false);
									}}
								/>
							)}
						</>
					)}
				</motion.div>
			</div>
		</div>
	);
};

export default ChatUserCard;

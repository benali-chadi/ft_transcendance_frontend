import axios from "axios";
import { motion } from "framer-motion";
import React, { FC, useContext, useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { userContext, UserState } from "../../../../helpers/context";
import { threeDotsVariants } from "../../../../helpers/variants";

interface Props {
	user: any;
	setMembersUpdated: React.Dispatch<React.SetStateAction<{}>>;
	room_id: number;
}

const SettingsMemberCard: FC<Props> = ({
	user,
	setMembersUpdated,
	room_id,
}) => {
	const { userSocket, updated } = useContext<UserState>(userContext);
	const navigate = useNavigate();
	const [showDropDown, setShowDropdown] = useState(false);

	const [_user, setUser] = useState(user);
	const [onMute, setOnMute] = useState(false);
	// Mute Settings
	const [days, setDays] = useState(0);
	const [hours, setHours] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const [muted, setmuted] = useState(false);

	const handleAddMemberClick = async () => {
		setShowDropdown(false);
		try {
			let { data } = await axios.post(
				`${process.env.REACT_APP_BACKEND_URL}chat/add_member`,
				{
					room_id: room_id,
					user_id: user.id,
				},
				{
					withCredentials: true,
				}
			);
			setMembersUpdated({});
		} catch (e) {}
	};
	const handleChangeMemberRolesClick = async () => {
		setShowDropdown(false);
		try {
			let role = user.role === "Member" ? "Admin" : "Member";
			let { data } = await axios.post(
				`${process.env.REACT_APP_BACKEND_URL}chat/change_member_role`,
				{
					room_id: room_id,
					user_id: user.id,
					role: role,
				},
				{
					withCredentials: true,
				}
			);
			setMembersUpdated({});
		} catch (e) {}
	};
	const handleBanClick = () => {
		setShowDropdown(false);
	};
	const handleMuteClick = () => {
		setOnMute(!onMute);
		// setShowDropdown(false);
	};
	const handleDeleteMemberClick = async () => {
		setShowDropdown(false);
		try {
			let { data } = await axios.post(
				`${process.env.REACT_APP_BACKEND_URL}chat/remove_member`,
				{
					room_id: room_id,
					user_id: user.id,
				},
				{
					withCredentials: true,
				}
			);
			setMembersUpdated({});
		} catch (e) {}
	};

	async function getUser() {
		try {
			const { data } = await axios.get(
				`${process.env.REACT_APP_BACKEND_URL}user/${_user.username}`,
				{ withCredentials: true }
			);
			setUser(data);
		} catch (e) {}
	}
	const ref: any = useRef();

	useEffect(() => {
		if (!user.IsMuted || (user.muteDate === new Date()))
			setmuted(true);
		getUser();
	}, [updated]);
	// const { setProfileUser } = useOutletContext<outletContext>();

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
			className="flex flex-shrink-0 justify-around w-fit p-4 bg-white rounded-xl hover:bg-white/50 hover:shadow-lg min-w-[15rem]"
		>
			{/* Avatar Part */}
			<div
				className="min-h-[3rem] min-w-[3rem] rounded-full flex justify-center items-center gap-4 cursor-pointer"
				onClick={() => {
					setShowDropdown(false);
					// setProfileUser(user);
					navigate(`/profile/${_user.username}`);
					// handleClick(user);
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
				<div
					className="hover:bg-gray-100 w-[2rem] cursor-pointer rounded-full flex justify-center items-center"
					onClick={() => setShowDropdown(!showDropDown)}
				>
					<i className="text-xl fa-solid fa-ellipsis-vertical "></i>
				</div>

				{user.role === undefined ? (
					<motion.div
						variants={threeDotsVariants}
						animate={showDropDown ? "open" : "close"}
						className={`p-2 text-sm font-light bg-white rounded-xl absolute z-10 top-[25px] left-[-3rem] w-max`}
					>
						<p
							className="p-1 pb-1 font-normal rounded-md rounded-b-none cursor-pointer hover:bg-gray-100"
							onClick={handleAddMemberClick}
						>
							Add Member
						</p>
					</motion.div>
				) : (
					<motion.div
						variants={threeDotsVariants}
						animate={showDropDown ? "open" : "close"}
						className={`p-2 text-sm font-light bg-white rounded-xl absolute z-10 top-[25px] left-[-3rem] w-max`}
					>
						<p
							className="p-1 pb-1 font-normal rounded-md rounded-b-none cursor-pointer hover:bg-gray-100"
							onClick={handleChangeMemberRolesClick}
						>
							{user.role === "Member"
								? "set as admin"
								: "remove privlige"}
						</p>
						<p
							className="p-1 pb-1 font-normal rounded-md rounded-b-none cursor-pointer hover:bg-gray-100"
							onClick={handleBanClick}
						>
							Ban
						</p>
						{muted && (<p
							className="p-1 pb-1 font-normal rounded-md rounded-b-none cursor-pointer hover:bg-gray-100"
							onClick={handleMuteClick}
						>
							Mute
						</p>)}
						{onMute && (
							<form
								className="flex flex-col"
								onSubmit={async (e) => {
									e.preventDefault();

									setShowDropdown(false);
									setOnMute(false);
									try{
										let date = new Date();

										console.log("date =", date);
										console.log("days =", days);
										date.setUTCDate(date.getDate() + days);
										date.setUTCHours(date.getHours() + hours - 1);
										date.setUTCMinutes(
											date.getMinutes() + minutes
										);
										let { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}chat/mute_user`,
										{
											user_id: user.id,
											room_id: room_id,
											date_unmute: date
										},
										{withCredentials: true})
										setDays(0);
										setHours(0);
										setMinutes(0);
										console.log("data =", data);
									}catch(e){
										
									}
								}}
							>
								<div className="flex justify-between">
									<input
										type="number"
										value={days}
										onChange={(e) => {
											const value = parseInt(
												e.target.value
											);
											if (!isNaN(value) && value >= 0)
												setDays(value);
										}}
										className="w-[3rem]"
									/>
									<p className="self-center text-xs text-gray-500">
										Days
									</p>
								</div>
								<div className="flex justify-between">
									<input
										type="number"
										value={hours}
										onChange={(e) => {
											const value = parseInt(
												e.target.value
											);
											if (!isNaN(value) && value >= 0)
												setHours(value);
										}}
										className="w-[3rem]"
									/>
									<p className="self-center text-xs text-gray-500">
										Hours
									</p>
								</div>
								<div className="flex justify-between">
									<input
										type="number"
										value={minutes}
										onChange={(e) => {
											const value = parseInt(
												e.target.value
											);
											if (!isNaN(value) && value >= 0)
												setMinutes(value);
										}}
										className="w-[3rem]"
									/>
									<p className="self-center text-xs text-gray-500">
										Minutes
									</p>
								</div>
								<button
									type="submit"
									className="self-center p-1 mt-1 rounded-lg bg-my-yellow hover:opacity-80"
								>
									<p className="text-xs">Mute</p>
								</button>
							</form>
						)}
						<p
							className="p-1 pb-1 font-normal rounded-md rounded-b-none cursor-pointer hover:bg-gray-100"
							onClick={handleDeleteMemberClick}
						>
							Remove Member
						</p>
					</motion.div>
				)}
			</div>
		</div>
	);
};

export default SettingsMemberCard;

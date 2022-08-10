import axios from "axios";
import { motion } from "framer-motion";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { FC } from "react";
import Button from "../../../common/Button";
import Modal from "../../../common/Modal";
import FriendCard from "./FriendCard";
import { cardVariants } from "../../../helpers/variants";
import { userContext, UserState } from "../../../helpers/context";

interface Props {
	handleCancel: () => void;
}

const Invitations: FC<Props> = ({ handleCancel }) => {
	const [users, setUsers] = useState<any>([]);
	const [text, setText] = useState("");
	const { userSocket, updatedRelation } =
		useContext<UserState>(userContext);
	useEffect(() => {
		async function showUsers() {
			try {
				const { data } = await axios.get(
					`${process.env.REACT_APP_BACKEND_URL}user/friend_requests`,
					{
						withCredentials: true,
					}
				);
				setUsers(
					data.map((element) => {
						return element.r_user;
					})
				);
			} catch (e) {}
		}
		showUsers();
	}, [updatedRelation]);

	const addFriend = async (user: any) => {

		userSocket?.emit(
			"relation status",
			{
				id: user.id,
				to_do: "accept_friend",
			},
			(res: any) => {
				setUsers(users.filter((usr) => usr.username !== user.username))
			}
		);
	};

	const declineInvitation = async (user: any) => {
		userSocket?.emit(
			"relation status",
			{
				id: user.id,
				to_do: "decline_req",
			},
			(res: any) => {
				setUsers(users.filter((usr) => usr.username !== user.username))
			}
		);
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
					{/* Users */}
					<div className="flex flex-wrap justify-center gap-2">
						{users.length != 0 ? (
							users
								.filter((user: any) =>
									user.username.includes(text)
								)
								.map((user: any) => {
									return (
										<div
											className="flex items-center gap-2"
											key={user.id}
										>
											<FriendCard user={user} />
											<div>
												<Button
													color="bg-my-yellow"
													handleClick={() =>
														addFriend(user)
													}
												>
													<h1 className="text-sm">
														Accept Invitation
													</h1>
												</Button>
												<Button
													color="bg-gray-200"
													handleClick={() =>
														declineInvitation(user)
													}
												>
													<h1 className="text-sm">
														Decline Invitation
													</h1>
												</Button>
											</div>
										</div>
									);
								})
						) : (
							<h1>No Users</h1>
						)}
					</div>
				</motion.div>
			</div>
		</Modal>
	);
};

export default Invitations;

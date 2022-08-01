import axios from "axios";
import React, { FC, useContext, useEffect } from "react";
import { useState } from "react";
import { UserState } from "../helpers/context";
import { userContext } from "../helpers/context";
import UpdateUser from "../pages/login/UpdateUser";
import Button from "./Button";

interface Props {
	user: {
		id: number;
		username: string;
		avatar: string;
	};
}

const UserCard: FC<Props> = ({ user }) => {
	// const [currentUser, setUser] = useState<any>(null);
	const { currentUser } = useContext<UserState>(userContext);
	const [showUpdateUser, setShowUpdateUser] = useState(false);
	const [buttonMessage, setButton] = useState("");

	let cond: boolean = currentUser.id === user.id;
	const checkRelation = (data) => {
		if (data.blocked) setButton("unblock");
		else if (!data.blocked) {
			if (!data.relation) setButton("You're blocked");
			else if (data.relation === "friends") setButton("unfriend");
			else if (data.relation === "none") setButton("Add friend");
			else if (data.relation === "Accept invitation")
				setButton("Accept invitation");
			else if (data.relation === "Invitation Sent")
				setButton("Invitation Sent");
		}

		// console.log("button =", buttonMessage);
	};
	async function updateRelation() {
		try {
			let obj: any;
			if (buttonMessage === "unblock") {
				obj = await axios.post(
					"http://localhost:3000/user/unblock_user",
					{
						to_unblock: user.id,
					},
					{ withCredentials: true }
				);
			} else if (buttonMessage === "Add friend") {
				obj = await axios.post(
					"http://localhost:3000/user/add_friend",
					{
						user: user.id,
					},
					{ withCredentials: true }
				);
			} else if (buttonMessage === "Accept invitation") {
				obj = await axios.post(
					"http://localhost:3000/user/accept_friend",
					{
						user: user.id,
					},
					{ withCredentials: true }
				);
			} else if (buttonMessage === "unfriend") {
				obj = await axios.post(
					"http://localhost:3000/user/unfriend",
					{
						user: user.id,
					},
					{ withCredentials: true }
				);
			}
			let data = obj.data;
			checkRelation(data);
		} catch (e) {
			console.log(e);
		}
	}

	useEffect(() => {
		async function getUserData() {
			try {
				if (!user || user.id === undefined) return;
				let { data } = await axios.get(
					`http://localhost:3000/user/${user.username}`,
					{
						withCredentials: true,
					}
				);
				checkRelation(data);
			} catch (e) {
				console.log(e);
			}
		}
		getUserData();
	}, [buttonMessage, user]);

	return (
		<div className="flex flex-col items-center gap-2 min-w-[15rem] max-w-lg m-auto">
			{showUpdateUser && (
				<UpdateUser
					handleCancelClick={() => setShowUpdateUser(!showUpdateUser)}
				/>
			)}
			<div
				className={`min-h-[8rem] min-w-[8rem] rounded-full bg-gray-300 flex justify-center ${
					cond ? "cursor-pointer hover:opacity-80" : ""
				}`}
				onClick={() => {
					if (cond) setShowUpdateUser(!showUpdateUser);
				}}
			>
				{user.avatar && (
					<img
						src={user.avatar}
						alt="avatar"
						className="w-[8rem] h-[8rem] rounded-full"
					/>
				)}
			</div>
			<div className="self-stretch">
				<h3 className="text-xl text-center text-my-blue">
					{user.username}
				</h3>
				{/* <div className="text-lg">level</div> */}
				{/* Ladder level */}
				<div className="relative self-stretch w-full mt-2 bg-gray-300 h-9 rounded-med">
					<p className="absolute text-base left-[40%] top-[10%]">
						level 4 - 70%
					</p>
					<div className="w-[70%] bg-my-yellow h-full rounded-med flex"></div>
				</div>
			</div>
			{!cond && (
				<Button color="bg-my-yellow" handleClick={updateRelation}>
					<h1 className="text-xl">{buttonMessage}</h1>
				</Button>
			)}
		</div>
	);
};

export default UserCard;

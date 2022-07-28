import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import { useContext } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import Button from "../../../common/Button";
import { UserState } from "../../../helpers/context";
import { userContext } from "../../../helpers/context";
import { outletContext } from "../Profile";
import FriendCard from "./FriendCard";

interface friend {
	avatar: string;
	id: number;
	username: string;
}

const FriendsList: FC = () => {
	const { currentUser } = useContext<UserState>(userContext);
	const navigate = useNavigate();
	const [friends, setFriends] = useState<friend[]>([]);
	const [users, setUsers] = useState([]);
	const { profileUser, id } = useOutletContext<outletContext>();

	async function getFriends() {
		try {
			const { data } = await axios.get(
				"http://localhost:3000/chat/friends",
				{ withCredentials: true }
			);

			// console.log(data);
			setFriends(data);
		} catch (e) {}
	}

	async function showUsers() {
		try {
			const { data } = await axios.get("http://localhost:3000/user/all", {
				withCredentials: true,
			});
			// console.log(data);
			setUsers(data);
		} catch (e) {}
	}

	const handleClick = () => {
		navigate(`/profile/${id}`);
	};

	useEffect(() => {
		getFriends();
	}, []);

	return (
		<div className="absolute inset-0 z-10 w-full h-screen px-6 py-20 bg-my-blue md:relative md:h-full">
			{/* Back Button */}
			<i
				className="absolute text-white cursor-pointer left-5 top-15 fa-solid fa-arrow-left md:hidden"
				onClick={handleClick}
			></i>
			{/* Search area */}
			<div className="flex items-center p-4 m-auto bg-white h-fit rounded-large w-[70%] mb-4">
				<i className="fa-solid fa-magnifying-glass text-[#655E5E] text-xl"></i>
				<input
					type="text"
					className="h-6 max-w-[15rem] w-full p-2 text-xl rounded-large font-Poppins"
					placeholder="Search..."
				/>
			</div>
			{currentUser.id == profileUser.id && (
				<div className="flex justify-end px-4 mb-4">
					<Button color="bg-my-yellow">
						<h2 onClick={showUsers} className="text-xl">
							find friends
						</h2>
					</Button>
				</div>
			)}
			{/* <div className="grid grid-cols-2 auto-rows-[5rem] gap-[2rem] md:grid-cols-4 h-full w-full"> */}
			<div className="flex flex-wrap justify-center gap-4">
				{friends.length != 0 ? (
					friends.map((friend: friend) => {
						return (
							<FriendCard
								key={friend.id}
								user={friend}
								status="online"
							/>
						);
					})
				) : users.length != 0 ? (
					users.map((user: friend) => {
						return (
							<FriendCard
								key={user.id}
								user={user}
								status="online"
							/>
						);
					})
				) : (
					<h1>No users </h1>
				)}
			</div>
		</div>
	);
};

export default FriendsList;

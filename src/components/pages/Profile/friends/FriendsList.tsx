import axios from "axios";
import env from "react-dotenv";
import React, { FC, useEffect, useState } from "react";
import { useContext } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import Button from "../../../common/Button";
import { UserState } from "../../../helpers/context";
import { userContext } from "../../../helpers/context";
import Profile, { outletContext } from "../Profile";
import FindFriends from "./FindFriends";
import FriendCard from "./FriendCard";
import Invitations from "./Invitations";

export interface friend {
	avatar: string;
	id: number;
	username: string;
}

const FriendsList: FC = () => {
	// const [currentUser, setUser] = useState<any>(null);
	const { currentUser } = useContext<UserState>(userContext);
	const { profileUser, username } = useOutletContext<outletContext>();

	const navigate = useNavigate();

	const [friends, setFriends] = useState<friend[]>([]);
	const [showFindFriends, setShowFindFriends] = useState(false);
	const [showInvitations, setShowInvitations] = useState(false);
	const [text, setText] = useState("");

	async function getFriends() {
		try {
			const { data } = await axios.get(
				`${env.BACKEND_URL}user/${username}/friends`,
				{ withCredentials: true }
			);
			setFriends(data);
		} catch (e) {}
	}

	const handleClick = () => {
		navigate(`/profile/${username}`);
	};

	useEffect(() => {
		getFriends();
		// let test = localStorage.getItem("CurrentUser");
		// if (test)
		// 	setUser(JSON.parse(test));
	}, []);

	return (
		<div className="absolute inset-0 z-10 w-full h-screen px-6 py-20 bg-my-blue md:relative md:h-full">
			{currentUser !== null ? (
				<>
					{showFindFriends && (
						<FindFriends
							handleCancel={() => setShowFindFriends(false)}
						/>
					)}
					{showInvitations && (
						<Invitations
							handleCancel={() => setShowInvitations(false)}
						/>
					)}
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
							value={text}
							onChange={(e) => setText(e.target.value)}
							className="h-6 max-w-[15rem] w-full p-2 text-xl rounded-large font-Poppins"
							placeholder="Search..."
						/>
					</div>
					{currentUser.id == profileUser.id && (
						<div className="flex justify-between px-4 mb-4">
							<Button
								color="bg-my-yellow"
								handleClick={() => setShowInvitations(true)}
							>
								<h2 className="text-xl">Show Invitations</h2>
							</Button>
							<Button
								color="bg-my-yellow"
								handleClick={() => setShowFindFriends(true)}
							>
								<h2 className="text-xl">find friends</h2>
							</Button>
						</div>
					)}
					{/* <div className="grid grid-cols-2 auto-rows-[5rem] gap-[2rem] md:grid-cols-4 h-full w-full"> */}
					<div className="flex flex-wrap justify-center gap-4">
						{friends.length != 0 ? (
							friends
								.filter((friend) =>
									friend.username.includes(text)
								)
								.map((friend: friend) => {
									return (
										<FriendCard
											key={friend.id}
											user={friend}
										/>
									);
								})
						) : (
							<h1>No users </h1>
						)}
					</div>
				</>
			) : (
				<div></div>
			)}
		</div>
	);
};

export default FriendsList;

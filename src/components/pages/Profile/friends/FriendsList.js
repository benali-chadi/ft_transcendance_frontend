import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../common/Button.tsx";
import { userContext } from "../../../helpers/context";
import FriendCard from "./FriendCard";

const FriendsList = () => {
	const { user } = useContext(userContext);
	const navigate = useNavigate();

	const handleClick = () => {
		navigate("/profile");
	};

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
			<div className="flex justify-end px-4 mb-4">
				<Button color="bg-my-yellow">
					<h2 className="text-xl">find friends</h2>
				</Button>
			</div>
			{/* <div className="grid grid-cols-2 auto-rows-[5rem] gap-[2rem] md:grid-cols-4 h-full w-full"> */}
			<div className="flex flex-wrap justify-center gap-4">
				<FriendCard user={user} status="online" />
				<FriendCard user={user} status="online" />
				<FriendCard user={user} status="online" />
				<FriendCard user={user} status="online" />
			</div>
		</div>
	);
};

export default FriendsList;

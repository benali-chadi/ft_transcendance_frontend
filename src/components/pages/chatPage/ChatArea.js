import React, { useState } from "react";
import ChatUserCard from "./ChatUserCard";

const ChatArea = ({ user, handleClick }) => {
	return (
		<div className="md:grid md:grid-rows-[70px_5fr_70px] md:h-full md:min-h-max md:shadow-lg md:shadow-gray-400 rounded-large">
			{/* Upper Area */}
			<div className="flex flex-col gap-4 py-16 px-4 bg-[#F0F4FC] md:bg-my-violet rounded-b-large sticky top-0 max-h-[15rem] md:rounded-t-large md:rounded-b-none md:max-h-max md:p-4 md:px-6 md:flex-row-reverse md:justify-between md:gap-0 md:h-full md:items-center md:static">
				{/* Icons */}
				<div className="flex justify-between md:justify">
					<i
						class="fa-solid fa-arrow-left cursor-pointer md:hidden"
						onClick={handleClick}
					></i>
					<i class="fa-solid fa-gear cursor-pointer md:text-white md:text-2xl"></i>
				</div>
				{/* User Area */}
				<div className="flex p-4 pb-0 md:p-0">
					<div className="min-h-[3rem] min-w-[3rem] rounded-full flex gap-4 items-center w-full">
						{user.avatar && (
							<img
								src={user.avatar}
								alt="avatar"
								className="w-[3rem] h-[3rem] rounded-full"
							/>
						)}
						{/* Text Part */}
						<div className="md:text-white">
							<h3 className="text-xl">{user.username}</h3>
						</div>
					</div>
				</div>
			</div>
			{/* Chat Bubbles */}
			<div className="md:h-full"></div>
			{/* Typing Area */}
			<div className="fixed bottom-0 flex items-center justify-center w-full gap-4 py-4 border-t-4 border-white md:relative ">
				<input
					type="text"
					className="h-6 w-[70%] min-w-[10rem] p-6 text-xl rounded-large font-Poppins"
					placeholder="Type Something..."
				/>
				<i class="fa-solid fa-paper-plane text-2xl"></i>
			</div>
		</div>
	);
};

export default ChatArea;

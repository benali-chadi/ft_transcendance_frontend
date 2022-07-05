import React, { useContext } from "react";
import { useState } from "react";
import Button from "../../common/Button";
import { userContext } from "../../helpers/context";
import ChatUserCard from "./ChatUserCard";

const Chat = () => {
	const { user } = useContext(userContext);
	const [toggle, setToggle] = useState(true);

	return (
		<div className="h-screen overflow-auto scroll bg-my-lavender">
			{/* Upper part */}
			<div className="flex flex-col gap-4 py-16 bg-my-dark-lavender/50 rounded-b-large">
				{/* Buttons */}
				<div className="flex justify-center gap-10">
					<Button
						color={toggle ? "bg-my-violet" : "bg-white"}
						handleClick={() => setToggle(true)}
					>
						<p
							className={`text-2xl ${
								toggle ? "text-white" : ""
							} capitalize`}
						>
							friends
						</p>
					</Button>
					<Button
						color={!toggle ? "bg-my-violet" : "bg-white"}
						handleClick={() => setToggle(false)}
					>
						<p
							className={`text-2xl ${
								!toggle ? "text-white" : ""
							} capitalize`}
						>
							groups
						</p>
					</Button>
				</div>
				{/* Search area */}
				<div className="flex items-center p-4 m-auto bg-white h-fit rounded-large w-fit">
					<i className="fa-solid fa-magnifying-glass text-[#655E5E] text-xl"></i>
					<input
						type="text"
						className="h-6 max-w-xs p-2 text-xl rounded-large font-Poppins"
						placeholder="Search"
					/>
				</div>
			</div>
			{/* Users */}
			<div className="flex flex-col h-full gap-4 px-4 mt-3 overflow-scroll scroll">
				<ChatUserCard status="online" user={user} />
				<ChatUserCard status="online" user={user} />
				<ChatUserCard status="online" user={user} />
			</div>
		</div>
	);
};

export default Chat;

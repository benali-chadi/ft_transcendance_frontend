import React, { useContext } from "react";
import { useState } from "react";
import Button from "../../common/Button";
import { userContext } from "../../helpers/context";
import ChatArea from "./ChatArea";
import ChatUserCard from "./ChatUserCard";

const Chat = () => {
	const { user, isMobile } = useContext(userContext);

	const [chatUser, setChatUser] = useState(null);

	const handleClick = (user) => {
		setChatUser(user);
	};
	const [toggle, setToggle] = useState(true);

	return (
		<div className="h-screen overflow-auto md:h-full scroll bg-my-lavender min-h-max md:rounded-large md:rounded-l-none md:grid md:grid-cols-[1fr_4fr] md:grid-rows-1 ">
			<div className={isMobile && chatUser ? "hidden" : "chatSideBar"}>
				{/* Upper part */}
				<div className="flex flex-col gap-4 py-16 bg-[#F0F4FC] md:bg-my-lavender rounded-b-large sticky top-0 max-h-[15rem] md:py-8">
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
							className="h-6 max-w-[15rem] p-2 text-xl rounded-large font-Poppins"
							placeholder="Search..."
						/>
					</div>
				</div>
				{/* Users */}
				<div className="flex flex-col h-full gap-4 px-4 mt-3 overflow-auto scroll">
					<ChatUserCard
						status="online"
						user={user}
						handleClick={handleClick}
					/>
					<ChatUserCard
						status="online"
						user={user}
						handleClick={handleClick}
					/>
					<ChatUserCard
						status="online"
						user={user}
						handleClick={handleClick}
					/>
				</div>
			</div>
			{chatUser && (
				<div className="md:p-10 md:min-h-full ">
					<ChatArea
						user={chatUser}
						handleClick={() => setChatUser(null)}
					/>
				</div>
			)}
		</div>
	);
};

export default Chat;

import React, { FC, useEffect, useState } from "react";
import { ChatBubble, MsgProps } from "./ChatBubble";
import ChatUserCard from "./ChatUserCard";

interface Props {
	user: any;
	handleClick: () => void;
}

const ChatArea: FC<Props> = ({ user, handleClick }) => {
	const [msgs, setMsgs] = useState<MsgProps[] | null>(null);
	const [text, setText] = useState("");

	const getCurrTime: () => string = () => {
		let date = /\d{2}:\d{2}/.exec(new Date().toString());
		if (date) return date[0];
		return "";
	};

	const initialMsgs: MsgProps[] = [
		{
			text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos veniam, optio adipisci quasi at alias est accusantium facere odio quod nihil nobis voluptatem sunt aspernatur voluptate sequi perspiciatis pariatur ipsum.",
			date: getCurrTime(),
			me: true,
		},
		{
			text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam, repellat? Repellendus, nulla.",
			date: getCurrTime(),
			me: false,
			user: user,
		},
		{
			text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
			date: getCurrTime(),
			me: false,
			user: user,
		},
		{
			text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque ullam, deserunt delectus minima hic in?",
			date: getCurrTime(),
			me: true,
		},
	];

	useEffect(() => {
		setMsgs(initialMsgs);
	}, []);

	return (
		<div className="h-screen md:grid md:grid-rows-[70px_5fr_70px] md:h-full md:shadow-lg md:shadow-gray-400 rounded-med">
			{/* Upper Area */}
			<div className="flex flex-col gap-4 py-16 px-4 bg-[#F0F4FC] md:bg-my-violet rounded-b-large sticky top-0 max-h-[15rem] md:rounded-t-med md:rounded-b-none md:max-h-max md:p-4 md:px-6 md:flex-row-reverse md:justify-between md:gap-0 md:h-full md:items-center md:static">
				{/* Icons */}
				<div className="flex justify-between md:justify">
					<i
						className="cursor-pointer fa-solid fa-arrow-left md:hidden"
						onClick={handleClick}
					></i>
					<i className="cursor-pointer fa-solid fa-gear md:text-white md:text-2xl"></i>
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
			<div className="flex flex-col-reverse h-full gap-4 p-4 overflow-auto">
				{msgs &&
					msgs.map((v) => (
						<ChatBubble
							text={v.text}
							date={v.date}
							me={v.me}
							user={v.user}
						/>
					))}
			</div>
			{/* Typing Area */}
			<div className="sticky bottom-0 flex items-center justify-center w-full gap-4 py-4 border-t-4 border-white h-max rounded-b-med md:static bg-my-lavender">
				<input
					type={text}
					onChange={(e) => setText(e.target.value)}
					className="h-6 w-[70%] min-w-[10rem] p-6 text-xl rounded-large font-Poppins"
					placeholder="Type Something..."
				/>
				<i
					className="text-2xl cursor-pointer fa-solid fa-paper-plane hover:opacity-70"
					onClick={() => {
						let msg: MsgProps = {
							text: text,
							date: getCurrTime(),
							me: true,
						};
						if (msgs) setMsgs([msg, ...msgs]);
						else setMsgs([msg]);
						setText("");
					}}
				></i>
			</div>
		</div>
	);
};

export default ChatArea;

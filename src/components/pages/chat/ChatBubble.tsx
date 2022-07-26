import React, { FC } from "react";

// /\d{2}:\d{2}/.exec(new Date().toString())[0] // To Get Current time
// Chat bubble contains:
// - Text
// - Date
// Me or Other
// if me:
// 	- Align right
//	- Color violet
// if Other:
// 	- Align left
// 	- Color light
// 	- Clickable avatar

export interface MsgProps {
	text: string;
	date: string;
	me: boolean;
	user?: any;
}

export const ChatBubble: FC<MsgProps> = ({ text, date, me, user }) => {
	return (
		<div
			className={`w-full min-h-max flex gap-2 ${me ? "justify-end" : ""}`}
		>
			{/* Avatar Part */}
			{!me && user && (
				<div
					className="min-h-[3rem] min-w-[3rem] md:w-[2.5rem] md:h-[2.5rem] rounded-full cursor-pointer self-end hover:opacity-70"
					// onClick={() => {
					// 	setShowDropdown(false);
					// 	handleClick(user);
					// }}
				>
					{user.avatar && (
						<img
							src={user.avatar}
							alt="avatar"
							className="w-[3rem] h-[3rem] rounded-full md:w-[2.5rem] md:h-[2.5rem]"
						/>
					)}
				</div>
			)}
			<div
				className={` rounded-med p-3 min-w-[10rem] min-h-[5rem] max-w-[50%] justify-between flex flex-col ${
					me
						? " bg-my-light-violet rounded-br-none text-white"
						: " bg-white rounded-bl-none"
				}`}
			>
				<p className="self-start text-base font-medium">{text}</p>
				<p className="self-end text-sm font-normal text-gray-400">
					{date}
				</p>
			</div>
		</div>
	);
};

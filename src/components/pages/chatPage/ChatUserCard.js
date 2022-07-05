import React from "react";

const ChatUserCard = ({ user, status, onCLick = Function }) => {
	return (
		<div className="flex justify-between px-4 pb-2">
			<div className="min-h-[3rem] min-w-[3rem] rounded-full flex justify-center gap-2">
				{user.avatar && (
					<img
						src={user.avatar}
						alt="avatar"
						className="w-[3rem] h-[3rem] rounded-full"
					/>
				)}
				<div className="text-left">
					<h3 className="text-xl">{user.username}</h3>
					<div className="text-sm font-semibold">{status}</div>
				</div>
			</div>
			<div onClick={onCLick} className="cursor-pointer">
				<i className="text-xl fa-solid fa-ellipsis-vertical"></i>
			</div>
		</div>
	);
};

export default ChatUserCard;

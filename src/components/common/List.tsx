import React, { FC } from "react";

interface Props {
	icon: string,
	title: string,
	children: JSX.Element,
}

const List: FC<Props> = ({ icon, title, children }) => {
	return (
		<div className="rounded-med min-w-[15rem]">
			<div className="flex w-full gap-4 p-4 bg-my-violet px-7 rounded-t-med">
				<i className={`${icon} text-my-yellow self-center`}></i>
				<h2 className="text-2xl font-bold text-white uppercase ">
					{title}
				</h2>
			</div>
			<div className="w-full min-h-[2rem] bg-my-dark-lavender">
				{children}
			</div>
		</div>
	);
};

export default List;

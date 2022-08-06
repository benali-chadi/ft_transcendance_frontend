import React, { FC, useContext } from "react";
import { userContext, UserState } from "../helpers/context";

interface Props {
	children?: JSX.Element;
}

const List: FC<Props> = ({ children }) => {
	return (
		<div
			className={`min-w-[15rem] max-h-[15rem] md:max-h-[25rem] overflow-auto scrolling h-full`}
		>
			{/* <div className="flex w-full gap-4 p-4 bg-my-violet px-7 rounded-t-med">
				<i className={`${icon} text-my-yellow self-center`}></i>
				<h2 className="text-2xl font-bold text-white uppercase ">
					{title}
				</h2>
			</div> */}
			<div className="w-full min-h-[2rem] h-full bg-my-dark-lavender overflow-auto scrolling flex flex-col items-center">
				{children}
			</div>
		</div>
	);
};

export default List;

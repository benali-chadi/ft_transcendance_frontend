import React from "react";

const Card = ({ title, icon, MainButton, SecondaryButton, children }) => {
	return (
		<div className="absolute top-0 z-10 flex items-center justify-center w-screen h-screen bg-black/80">
			<div className="h-[30%] min-h-[20rem] w-[20%] min-w-fit overflow-auto bg-white p-4 flex flex-col justify-between rounded-xl shadow-lg">
				{/* Head Part */}
				<div className="flex justify-between">
					<h1>{title}</h1>
					<i className={icon}></i>
				</div>
				{/* Main Part */}
				<div className="">{children}</div>
				{/* Buttons */}
				<div className="flex gap-4">
					{SecondaryButton}
					{MainButton}
				</div>
			</div>
		</div>
	);
};

export default Card;

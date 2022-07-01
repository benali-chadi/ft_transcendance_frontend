import { motion } from "framer-motion";
import React from "react";

const Card = ({
	title,
	icon,
	MainButton,
	SecondaryButton,
	children,
	handleCancel,
}) => {
	return (
		<div className="absolute top-0 z-10 flex items-center justify-center w-screen h-screen bg-black/80">
			<div
				className="absolute top-0 w-screen h-screen cursor-pointer"
				onClick={handleCancel}
			></div>
			<motion.div
				initial={{ x: "-100vw" }}
				animate={{ x: 0 }}
				transition={{ type: "spring", stiffness: 120 }}
				exit={{
					x: "100vw",
					transition: { type: "tween", duration: 0.5 },
				}}
				className="h-[30%] min-h-[20rem] w-[20%] min-w-fit overflow-auto bg-white p-4 flex flex-col justify-between rounded-xl shadow-lg"
			>
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
			</motion.div>
		</div>
	);
};

export default Card;

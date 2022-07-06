import { motion } from "framer-motion";
import React from "react";

const Button = ({
	children,
	handleClick = Function,
	color,
	hoverColor,
	type = "button",
}) => {
	return (
		<motion.button
			whileHover={{
				scale: 1.1,
				transition: { type: "spring", stiffness: 300 },
			}}
			className={`h-1/6 max-h-20 min-h-[2rem] max-w-md p-3 min-w-[8rem] ${color} rounded-large flex justify-center items-center ${
				color === "bg-my-yellow" ? "border-b-2 border-black" : ""
			} cursor-pointer hover:${hoverColor}`}
			onClick={handleClick}
			type={type}
		>
			{children}
		</motion.button>
	);
};

export default Button;

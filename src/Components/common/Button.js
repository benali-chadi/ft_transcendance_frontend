import React from "react";

const Button = ({
	children,
	handleClick = () => {},
	color,
	hoverColor,
	type = "button",
}) => {
	return (
		<button
			className={`h-1/6 max-h-20 min-h-[3rem] max-w-md w-1/2 min-w-[5rem] ${color} rounded-large flex justify-center items-center ${
				color === "bg-my-yellow" ? "border-b-2 border-black" : ""
			} cursor-pointer hover:${hoverColor}`}
			// {...(
			//     type ==="button"
			//     ? { onClick: handleClick }
			//     : {}
			// )}
			onClick={handleClick}
			type={type}
		>
			{children}
		</button>
	);
};

export default Button;

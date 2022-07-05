import { motion } from "framer-motion";
import React, { useState } from "react";

const loaderVariants = {
	bounce: {
		x: [-30, 30],
		y: [0, -40],
		transition: {
			x: {
				yoyo: Infinity,
				duration: 0.5,
			},
			y: {
				yoyo: Infinity,
				duration: 0.25,
			},
		},
	},
	rotate: {
		rotate: [0, 360],
		transition: {
			rotate: {
				yoyo: Infinity,
				duration: 1,
			},
		},
	},
};

const Loader = () => {
	const [showHeader, setShowHeader] = useState(true);

	return (
		<div className="flex flex-col items-center justify-center">
			{showHeader ? <h1>Catch It!</h1> : <h1>Good Job!</h1>}
			<motion.div
				onDrag={() => setShowHeader(false)}
				variants={loaderVariants}
				animate="bounce"
				className="w-10 h-10 rounded-full bg-my-violet"
				drag
				dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
				dragElastic={0.7}
				whileDrag={{ scale: 1.7 }}
			></motion.div>
			<div className="h-5 rounded-md w-28 bg-my-violet"></div>
		</div>
	);
};

export default Loader;

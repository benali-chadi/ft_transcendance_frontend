import { motion } from "framer-motion";
import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button";
import Modal from "../common/Modal";

interface Props {
	win: boolean;
}

const GameOverCard: FC<Props> = ({ win }) => {
	const navigate = useNavigate();

	const handleReturnClick = () => {
		navigate("/");
	};

	return (
		<Modal>
			<div className="absolute top-0 z-40 flex items-center justify-center w-screen h-screen bg-black/80">
				<motion.div
					initial={{ scale: 0 }}
					animate={{ scale: 1.5 }}
					transition={{ type: "tween", duration: 0.8 }}
					className="flex flex-col justify-center gap-3 bg-white rounded-xl p-7"
				>
					<h2 className="text-5xl font-bold text-center">
						{win ? "You Win" : "You Lose"}
					</h2>
					<Button
						color="bg-my-yellow"
						handleClick={handleReturnClick}
					>
						<h2 className="text-base font-bold">Return Home</h2>
					</Button>
				</motion.div>
			</div>
		</Modal>
	);
};

export default GameOverCard;

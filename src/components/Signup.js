import React from "react";
import { useState } from "react";
import Button from "./common/Button";
import Card from "./common/Card";
import Modal from "./common/Modal";

const SignUp = ({ handleCancelClick, handleSaveClick }) => {
	const [userName, setUserName] = useState("");
	const [Avatar, setAvatar] = useState(null);

	return (
		<Modal>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					handleSaveClick(userName);
				}}
			>
				<Card
					title="Sign Up"
					icon="fa-solid fa-right-to-bracket"
					MainButton={
						<Button
							color="bg-my-yellow"
							hoverColor="bg-yellow-300"
							type="submit"
						>
							Save
						</Button>
					}
					SecondaryButton={
						<Button
							color="bg-gray-200"
							hoverColor="bg-white"
							handleClick={handleCancelClick}
						>
							Cancel
						</Button>
					}
				>
					<div className="flex flex-col justify-between gap-4 item-center">
						{/* Avatar */}
						<div className="avatarUpload">
							{Avatar && (
								<img
									src={URL.createObjectURL(Avatar)}
									alt="Avatar"
								/>
							)}
						</div>
						{/* UserName input */}
						<input
							type="text"
							placeholder="Choose Your Username"
							className="rounded-large h-10 border-black border-[1px] px-3 font-Poppins"
							required
							value={userName}
							onChange={(e) => setUserName(e.target.value)}
						/>
					</div>
				</Card>
			</form>
		</Modal>
	);
};

export default SignUp;

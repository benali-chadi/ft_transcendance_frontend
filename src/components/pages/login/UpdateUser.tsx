import React, { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../common/Button.tsx";
import Card from "../../common/Card.tsx";
import Modal from "../../common/Modal.tsx";
import { UserState } from "../../helpers/context";
import { userContext } from "../../helpers/context.ts";

const UpdateUser = ({ handleCancelClick }) => {
	const { user, setUser } = useContext<UserState>(userContext);
	const navigate = useNavigate();

	const [username, setUsername] = useState(user.username);
	const [avatar, setAvatar] = useState(user.avatar);

	return (
		<Modal>
			<form
				onSubmit={(e) => {
					e.preventDefault();

					setUser({ ...user, username, avatar });
					navigate("/");
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
							color="bg-gray-300"
							hoverColor="bg-white"
							handleClick={handleCancelClick}
						>
							Cancel
						</Button>
					}
					handleCancel={handleCancelClick}
				>
					<div className="flex flex-col items-center gap-4">
						{/* Avatar */}
						<div className="avatarUpload">
							<div
								className="upload-button"
								onClick={() => {
									let element: HTMLElement = document
									.getElementsByClassName(
										"file-upload"
									)[0] as HTMLElement;
									
									element.click();
								}}
							>
								{avatar && (
									<img
										// src={URL.createObjectURL(avatar)}
										src={avatar}
										alt="avatar"
									/>
								)}
							</div>
							<input
								type="file"
								className="hidden file-upload"
								onChange={(e) => {
									let file: any = (e.target as HTMLInputElement);
									if (typeof file.files[0] !== "string")
										file = URL.createObjectURL(file.files[0]);
									setAvatar(file);
								}}
							/>
						</div>
						{/* UserName input */}
						<input
							type="text"
							placeholder="Choose Your Username"
							className="rounded-large h-10 border-black border-[1px] px-3 font-Poppins"
							required
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</div>
				</Card>
			</form>
		</Modal>
	);
};

export default UpdateUser;
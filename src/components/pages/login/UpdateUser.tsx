import axios from "axios";
import { motion } from "framer-motion";
import React, { FC, useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../common/Button";
import Card from "../../common/Card";
import Modal from "../../common/Modal";
import { UserState } from "../../helpers/context";
import { userContext } from "../../helpers/context";

interface Props {
	handleCancelClick: () => void;
}

const UpdateUser: FC<Props> = ({ handleCancelClick }) => {
	const { currentUser, setCurrentUser } = useContext<UserState>(userContext);
	const navigate = useNavigate();

	const [username, setUsername] = useState(currentUser.username);
	const [avatar, setAvatar] = useState(currentUser.avatar);
	const [showError, setShowError] = useState(false);
	const [selectedfile, setFile] = useState<File>();

	return (
		<Modal>
			<form
				onSubmit={async (e) => {
					e.preventDefault();
					try {
						const formData = new FormData();
						formData.append("username", username);
						if (selectedfile != null) {
							formData.append("avatar", selectedfile);
						}
						const updated = await axios.post(
							"http://localhost:3000/user/update_profile",
							formData,
							{ withCredentials: true }
						);
						setCurrentUser({ ...currentUser, username, avatar });
						navigate("/");
					} catch (e) {
						setShowError(true);
						setTimeout(() => {
							setShowError(false);
						}, 2000);
					}
				}}
			>
				<Card
					title="Update Profile"
					icon="fa-solid fa-right-to-bracket"
					MainButton={
						<Button
							color="bg-my-yellow"
							hoverColor="bg-yellow-300"
							type="submit"
						>
							<p>Save</p>
						</Button>
					}
					SecondaryButton={
						<Button
							color="bg-gray-300"
							hoverColor="bg-white"
							handleClick={handleCancelClick}
						>
							<p>Cancel</p>
						</Button>
					}
					handleCancel={handleCancelClick}
				>
					<div className="relative flex flex-col items-center gap-4">
						{/* Avatar */}
						<div className="avatarUpload">
							<div
								className="upload-button"
								onClick={() => {
									let element: HTMLElement =
										document.getElementsByClassName(
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
									let file: any =
										e.target as HTMLInputElement;
									if (file.files) setFile(file.files[0]);
									if (typeof file.files[0] !== "string") {
										file = URL.createObjectURL(
											file.files[0]
										);
									}
									setAvatar(file);
									// if (e.target.files)
									// 	setFile(e.target.files[0])
								}}
							/>
						</div>
						{showError && (
							<motion.div
								animate={{ opacity: 1, y: 0 }}
								initial={{ opacity: 0, y: -100 }}
								transition={{ type: "tween", delay: 0.5 }}
								className="absolute p-2 text-white rounded-lg bg-red-400/70 opacity-40"
							>
								<p>Username already exists</p>
							</motion.div>
						)}
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

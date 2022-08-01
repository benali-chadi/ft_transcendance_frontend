import { motion } from "framer-motion";
import React, { FC, useState } from "react";
import Button from "../../common/Button";
import Card from "../../common/Card";
import Modal from "../../common/Modal";

interface Props {
	handleCancelClick: () => void;
}

const CreateChannel: FC<Props> = ({ handleCancelClick }) => {
	const [channelName, setChannelName] = useState("");
	const [privacy, setPrivacy] = useState<"public" | "private" | "protected">(
		"public"
	);
	const [password, setPassword] = useState("");

	const [channelAvatar, setChannelAvatar] = useState<any>();
	const [selectedfile, setFile] = useState<File>();

	const [showError, setShowError] = useState(false);

	return (
		<Modal>
			<form
				onSubmit={async (e) => {
					e.preventDefault();
					try {
						const formData = new FormData();
						formData.append("channelName", channelName);
						formData.append("channelPrivacy", privacy);
						if (selectedfile)
							formData.append("channelAvatar", selectedfile);
						if (password) formData.append("password", password);
						handleCancelClick();
					} catch (e) {
						setShowError(true);
						setTimeout(() => {
							setShowError(false);
						}, 2000);
					}
				}}
			>
				<Card
					title="Create Channel"
					icon="fa-solid fa-user-group"
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
					<div className="relative flex flex-col items-center gap-4 ">
						{/* Group Avatar */}
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
								{channelAvatar && (
									<img
										// src={URL.createObjectURL(groupAvatar)}
										src={channelAvatar}
										alt="Channel's avatar"
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
									setChannelAvatar(file);
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
								<p>Channel Name already exists</p>
							</motion.div>
						)}
						{/* Group Name Input */}
						<input
							type="text"
							placeholder="Choose Your channel's name"
							className="rounded-large h-10 border-black border-[1px] px-3 font-Poppins"
							required
							value={channelName}
							onChange={(e) => setChannelName(e.target.value)}
						/>
						{/* Privacy Options */}
						<div className="flex bg-my-violet rounded-med">
							<h2
								className={`p-2 text-white cursor-pointer rounded-l-med ${
									privacy === "public"
										? "bg-my-light-violet font-bold"
										: ""
								}`}
								onClick={() => setPrivacy("public")}
							>
								Public
							</h2>
							<h2
								className={`p-2 text-white cursor-pointer border-x-2 ${
									privacy === "private"
										? "bg-my-light-violet font-bold"
										: ""
								}`}
								onClick={() => setPrivacy("private")}
							>
								Private
							</h2>
							<h2
								className={`p-2 text-white cursor-pointer rounded-r-med ${
									privacy === "protected"
										? "bg-my-light-violet font-bold"
										: ""
								}`}
								onClick={() => setPrivacy("protected")}
							>
								Protected
							</h2>
						</div>
						{/* Password */}
						{privacy === "protected" ? (
							<input
								type="password"
								placeholder="Type Your Password"
								className="rounded-large h-10 border-black border-[1px] px-3 font-Poppins pb-2"
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						) : (
							<></>
						)}
					</div>
				</Card>
			</form>
		</Modal>
	);
};

export default CreateChannel;

import React, { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./common/Button";
import Card from "./common/Card";
import Modal from "./common/Modal";
import { userContext } from "./helpers/context";

const SignUp = ({ handleCancelClick }) => {
	const { setUser } = useContext(userContext);
	const navigate = useNavigate();

	const [userName, setUserName] = useState("");
	const [avatar, setAvatar] = useState(null);

	return (
		<Modal>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					setUser({ userName, avatar });
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
							color="bg-gray-200"
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
								class="upload-button"
								onClick={() => {
									document
										.getElementsByClassName(
											"file-upload"
										)[0]
										.click();
								}}
							>
								{avatar && (
									<img
										src={URL.createObjectURL(avatar)}
										alt="avatar"
									/>
								)}
							</div>
							<input
								type="file"
								className="hidden file-upload"
								onChange={(e) => setAvatar(e.target.files[0])}
							/>
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

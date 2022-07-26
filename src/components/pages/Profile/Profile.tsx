import { motion } from "framer-motion";
import React, { FC } from "react";
import { NavLink, Outlet } from "react-router-dom";
import UserCard from "../../common/UserCard";
import { pageVariants } from "../../helpers/variants";

const Profile: FC = () => {
	return (
		<motion.div
			variants={pageVariants}
			initial="initial"
			animate="animate"
			// exit="exit"
			className="h-screen overflow-auto scroll min-h-max md:grid md:h-full md:justify-center md:rounded-large md:grid-cols-[2fr_5fr] md:rounded-l-none bg-my-blue"
		>
			{/* Side-bar */}
			<div className="h-full md:rounded-r-large bg-my-lavender">
				<div className="p-[5rem]">
					<UserCard />
				</div>
				{/* Sub-Pages */}
				<ul className="profile-links">
					<li>
						<NavLink className="profile-link" to="friends">
							<i className="fa-solid fa-user-group"></i>
							<h2>Friends</h2>
						</NavLink>
					</li>
					<li>
						<NavLink className="profile-link" to="achievements">
							<i className="fa-solid fa-trophy"></i>
							<h2>Achievements</h2>
						</NavLink>
					</li>
					<li>
						<NavLink className="profile-link" to="matchHistory">
							<i className="fa-solid fa-table-tennis-paddle-ball"></i>
							<h2>Match History</h2>
						</NavLink>
					</li>
				</ul>
			</div>
			<div className="w-full">
				<Outlet />
			</div>
		</motion.div>
	);
};

export default Profile;

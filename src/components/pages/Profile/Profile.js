import React from "react";
import { NavLink } from "react-router-dom";
import UserCard from "../../common/UserCard";

const Profile = () => {
	return (
		<div className="p-8 overflow-auto bg-no-repeat bg-cover scroll h-3/5 min-h-max rounded-b-large md:col-span-3 md:h-full md:justify-center md:rounded-large md:rounded-l-none ">
			<div className="p-[5rem] px-[25%]">
				<UserCard />
			</div>
			{/* Sub-Pages */}
			<ul className="profile-links">
				<li>
					<NavLink className="profile-link" to="friends">
						<i class="fa-solid fa-user-group"></i>
						<h2>Friends</h2>
					</NavLink>
				</li>
				<li>
					<NavLink className="profile-link" to="achievements">
						<i class="fa-solid fa-trophy"></i>
						<h2>Achievements</h2>
					</NavLink>
				</li>
				<li>
					<NavLink className="profile-link" to="matchHistory">
						<i class="fa-solid fa-table-tennis-paddle-ball"></i>
						<h2>Match History</h2>
					</NavLink>
				</li>
			</ul>
		</div>
	);
};

export default Profile;

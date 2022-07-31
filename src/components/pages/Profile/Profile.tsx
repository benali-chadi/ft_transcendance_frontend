import axios from "axios";
import { motion } from "framer-motion";
import React, { FC, useContext, useEffect, useRef, useState } from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import Button from "../../common/Button";
import UserCard from "../../common/UserCard";
// import  {memoizedUserCard} from "../../common/UserCard";
import { userContext } from "../../helpers/context";
import { pageVariants } from "../../helpers/variants";

interface Props {}

export interface outletContext {
	profileUser: any;
	setProfileUser: React.Dispatch<React.SetStateAction<any>> | (() => void);
	id: string;
}

const Profile: FC<Props> = () => {
	const [profileUser, setProfileUser] = useState<any>({});
	const { id } = useParams();

	useEffect(() => {
		async function getUserData() {
			try {
				//console.log(test)
				let { data } = await axios.get(
					`http://localhost:3000/user/${id}`,
					{
						withCredentials: true,
					}
				);
				setProfileUser(data);
			} catch (e) {
				//console.log(e);
			}
		}
		getUserData();
	}, [id]);

	return (
		<motion.div
			// variants={pageVariants}
			// initial="initial"
			// animate="animate"
			// // exit="exit"
			className="h-screen overflow-auto scrolling min-h-max md:grid md:h-full md:justify-center md:rounded-large md:grid-cols-[2fr_5fr] md:rounded-l-none bg-my-blue"
		>
			<div className="h-full md:rounded-r-large bg-my-lavender">
				<div className="p-[5rem]">
					<UserCard user={profileUser} />
				</div>
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
				<Outlet context={{ profileUser, setProfileUser, id }} />
			</div>
		</motion.div>
	);
};

export default Profile;

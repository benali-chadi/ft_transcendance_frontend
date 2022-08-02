import axios from "axios";
import React, { FC, useContext, useEffect } from "react";
import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import UserCard from "./common/UserCard";
// import { useMediaQuery } from "react-responsive";
import { userContext, UserState } from "./helpers/context";
// @ts-ignore
import logo from "../img/logo.png";
import { motion } from "framer-motion";
import { navVariants } from "./helpers/variants";
import { useMediaQuery } from "react-responsive";
import env from "react-dotenv";
import Search from "./common/Search";

const Navigation: FC = () => {
	const [showNav, setShoweNav] = useState(false);
	const { currentUser, setCurrentUser } = useContext<UserState>(userContext);
	const navigate = useNavigate();

	const [showSearch, setShowSearch] = useState(false);

	const isMobile = useMediaQuery({
		query: "(max-width: 767px)",
	});

	const handleLogOutClick = async () => {
		localStorage.clear();
		async function logOut() {
			await axios.get(`${process.env.REACT_APP_BACKEND_URL}auth/logout`, {
				withCredentials: true,
			});

			navigate("/login");
		}
		await logOut();
		setCurrentUser(null);
	};

	const handleSearchCancel = () => {
		setShowSearch(false);
		setShoweNav(false);
	};
	return (
		<div className="w-full h-screen overflow-hidden bg-gray-300 md:p-6 md:py-20 md:grid md:grid-cols-12 ">
			{showSearch && <Search handleCancel={handleSearchCancel} />}
			{/* Top Part */}
			{isMobile && !showNav && (
				<div className="absolute z-20 flex justify-between w-full p-2 px-4 bg-white/50">
					<div
						className="cursor-pointer"
						onClick={() => setShoweNav(!showNav)}
					>
						<i className="fa-solid fa-bars"></i>
					</div>
					<img src={logo} alt="logo" className="h-[2rem] w-[2rem]" />
				</div>
			)}
			{/* NavBar */}
			{isMobile && showNav && (
				<div
					className="absolute z-20 w-screen h-screen bg-black/50"
					onClick={() => setShoweNav(!showNav)}
				></div>
			)}
			<motion.nav
				variants={navVariants}
				animate={isMobile ? (showNav ? "open" : "close") : ""}
				className={!isMobile ? "desktopNavBar" : "mobileNavBar"}
			>
				{isMobile && (
					<div className="flex flex-col justify-between h-max">
						<div
							className="text-white cursor-pointer"
							onClick={() => setShoweNav(!showNav)}
						>
							<i className="fa-solid fa-xmark"></i>
						</div>
						<UserCard user={currentUser} />
					</div>
				)}
				<div
					className="text-[1.7rem] cursor-pointer hover:text-blue-200 text-white md:pt-24"
					onClick={() => setShowSearch(true)}
				>
					<i className="fa-solid fa-magnifying-glass"></i>
					{isMobile && (
						<h2 onClick={() => isMobile && setShoweNav(!showNav)}>
							Search
						</h2>
					)}
				</div>
				<ul>
					<li>
						<NavLink className="inactive" to="/">
							<i
								className="fa-solid fa-house"
								onClick={() =>
									isMobile && setShoweNav(!showNav)
								}
							></i>
							{isMobile && (
								<h2
									onClick={() =>
										isMobile && setShoweNav(!showNav)
									}
								>
									HOME
								</h2>
							)}
						</NavLink>
					</li>
					<li>
						<NavLink
							className="inactive"
							to={`profile/${currentUser.username}`}
						>
							<i
								className="fa-solid fa-user"
								onClick={() =>
									isMobile && setShoweNav(!showNav)
								}
							></i>
							{isMobile && (
								<h2
									onClick={() =>
										isMobile && setShoweNav(!showNav)
									}
								>
									Profile
								</h2>
							)}
						</NavLink>
					</li>
					<li>
						<NavLink className="inactive" to="chat">
							<i
								className="fa-solid fa-comment-dots"
								onClick={() =>
									isMobile && setShoweNav(!showNav)
								}
							></i>
							{isMobile && (
								<h2
									onClick={() =>
										isMobile && setShoweNav(!showNav)
									}
								>
									Chat
								</h2>
							)}
						</NavLink>
					</li>
				</ul>
				<div
					className="text-white cursor-pointer sm:py-4 md:pb-8 hover:text-red-500"
					onClick={handleLogOutClick}
				>
					<i className="fa-solid fa-xs fa-right-from-bracket"></i>
				</div>
			</motion.nav>
			<div className="col-span-11 max-h-[80vh]">
				<Outlet />
			</div>
		</div>
	);
};

export default Navigation;

import React, { useContext } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
// import { useMediaQuery } from "react-responsive";
import { userContext } from "./helpers/context";

const Navigation = () => {
	const { setUser, isMobile } = useContext(userContext);

	const navigate = useNavigate();

	const handleLogOutClick = () => {
		navigate("/login");
		setUser(null);
	};

	return (
		<div className="w-full h-screen overflow-auto bg-gray-300 md:p-6 md:py-20 md:grid md:grid-cols-12">
			{/* NavBar */}
			<nav className={isMobile ? "mobileNavBar" : "desktopNavBar"}>
				<ul>
					<li>
						<NavLink className="inactive" to="/">
							<i className="fa-solid fa-house"></i>
						</NavLink>
					</li>
					<li>
						<NavLink className="inactive" to="profile">
							<i className="fa-solid fa-user"></i>
						</NavLink>
					</li>
					<li>
						<NavLink className="inactive" to="chat">
							<i className="fa-solid fa-comment-dots"></i>
						</NavLink>
					</li>
				</ul>
				<div
					className="py-4 text-white cursor-pointer hover:text-red-500"
					onClick={handleLogOutClick}
				>
					<i className="fa-solid fa-xs fa-right-from-bracket"></i>
				</div>
			</nav>
			<div className="col-span-11">
				<Outlet />
			</div>
		</div>
	);
};

export default Navigation;

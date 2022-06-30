import React from "react";
import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const Navigation = ({ setUser }) => {
	const [activePage, setActivePage] = useState(0);
	const [showNavBar, setShowNavBar] = useState(false);
	const navigate = useNavigate();
	const isMobile = useMediaQuery({
		query: "(max-width: 767px)",
	});

	const activeStyle = "text-my-light-violet";
	const inActiveStyle = "hover:text-blue-200";

	const handleLogOutClick = () => {
		navigate("/login");
		setUser(null);
	};
	const handleShowNavBarClick = () => {
		setShowNavBar(!showNavBar);
	};

	return (
		<div className="w-full h-screen overflow-auto bg-gray-300 md:p-6 md:py-20 md:grid md:grid-cols-12">
			{/* NavBar */}
			<nav className={isMobile ? "mobileNavBar" : "desktopNavBar"}>
				<ul>
					<li>
						<Link to="/">
							<div
								className={`${
									!activePage ? activeStyle : inActiveStyle
								}`}
								onClick={() => {
									setActivePage(0);
									handleShowNavBarClick();
								}}
							>
								<i className="fa-solid fa-house"></i>
							</div>
						</Link>
					</li>
					<li>
						<Link to="profile">
							<div
								className={`${
									activePage === 1
										? activeStyle
										: inActiveStyle
								}`}
								onClick={() => {
									setActivePage(1);
									handleShowNavBarClick();
								}}
							>
								<i className="fa-solid fa-user"></i>
							</div>
						</Link>
					</li>
					<li>
						<Link to="chat">
							<div
								className={`${
									activePage === 2
										? activeStyle
										: inActiveStyle
								}`}
								onClick={() => {
									setActivePage(2);
									handleShowNavBarClick();
								}}
							>
								<i className="fa-solid fa-comment-dots"></i>
							</div>
						</Link>
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

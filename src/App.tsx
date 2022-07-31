import Navigation from "./components/Navigation";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	useLocation,
} from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import ProtectedRoute from "./components/common/ProtectedRoute";
import { userContext, UserState } from "./components/helpers/context";
import { AnimatePresence } from "framer-motion";
import { useMediaQuery } from "react-responsive";
// import axios from "axios";
import Log from "./components/pages/login/Log";
import Login from "./components/pages/login/Login";
import Home from "./components/pages/Home";
import Chat from "./components/pages/chat/Chat";
import Profile from "./components/pages/Profile/Profile";
import FriendsList from "./components/pages/Profile/friends/FriendsList";
import MatchHistory from "./components/pages/Profile/matchHistory/MatchHistory";
import AchievementsBoard from "./components/pages/Profile/achievements/AchievementsBoard";
import React from "react";
// import io from "socket.io-client"
// import logo42 from "./img/42logo.svg"

const App: React.FC = () => {
	const [currentUser, setCurrentUser] = useState("");

	const isMobile = useMediaQuery({
		query: "(max-width: 767px)",
	});
	const location = useLocation();

	useEffect(() => {
		const userStorage = localStorage.getItem("CurrentUser");
		if (userStorage) setCurrentUser(JSON.parse(userStorage));
	}, []);

	return (
		<userContext.Provider value={{ currentUser, setCurrentUser, isMobile }}>
			<div className="h-screen text-4xl font-bold text-center App">
				<AnimatePresence exitBeforeEnter>
					<Routes>
						<Route
							path="/"
							element={
								<ProtectedRoute>
									<Navigation />
								</ProtectedRoute>
							}
						>
							<Route path="/" element={<Home />} />
							<Route path="profile/:id" element={<Profile />}>
								<Route
									path="friends"
									element={<FriendsList />}
								/>
								<Route
									path="achievements"
									element={<AchievementsBoard />}
								/>
								<Route
									path="matchHistory"
									element={<MatchHistory />}
								/>
							</Route>
							<Route path="chat" element={<Chat />} />
						</Route>
						<Route
							path="/login"
							element={
								<ProtectedRoute redirectPath="/">
									<Login />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/Test"
							element={
								<ProtectedRoute redirectPath="/">
									<Log />
								</ProtectedRoute>
							}
						/>
					</Routes>
				</AnimatePresence>
			</div>
		</userContext.Provider>
	);
};

export default App;

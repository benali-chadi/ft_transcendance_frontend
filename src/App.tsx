import Navigation from "./components/Navigation";
import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import ProtectedRoute from "./components/common/ProtectedRoute";
import { userContext } from "./components/helpers/context";
import { AnimatePresence } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import axios from "axios";
import Log from "./components/pages/login/Log";
import Login from "./components/pages/login/Login";
import Home from "./components/pages/Home";
import Chat from "./components/pages/chat/Chat";
import Profile from "./components/pages/Profile/Profile";
import FriendsList from "./components/pages/Profile/friends/FriendsList";
import MatchHistory from "./components/pages/Profile/matchHistory/MatchHistory";
import AchievementsBoard from "./components/pages/Profile/achievements/AchievementsBoard";
import React from "react";
import io from "socket.io-client"
// import logo42 from "./img/42logo.svg"

const App: React.FC = () => {
	const [currentUser, setUser] = useState(null);
	const [chatSocket, setSocket] = useState<any>(null);

	useEffect(() : any => {
		async function getUserData() {
			try {
				let { data } = await axios.get(
					"http://localhost:3000/user/me",
					{
						withCredentials: true,
					}
				);
				setUser(data);
			} catch (e) {}
		}
		getUserData();
		const socket_chat = io('http://localhost:3000/chat' , {withCredentials:true});
		setSocket(socket_chat);
		return () => socket_chat.close();
	}, []);

	const isMobile = useMediaQuery({
		query: "(max-width: 767px)",
	});
	const location = useLocation();

	return (
		<div className="h-screen text-4xl font-bold text-center App">
			<userContext.Provider value={{ currentUser, setUser, isMobile }}>
				<AnimatePresence exitBeforeEnter>
					<Routes location={location} key={location.key}>
						<Route
							path="/"
							element={
								<ProtectedRoute toCheck={!currentUser}>
									<Navigation />
								</ProtectedRoute>
							}
						>
							<Route path="/" element={<Home />} />
							<Route
								path="profile/:id"
								element={<Profile user={currentUser} />}
							>
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
							<Route path="chat" element={<Chat socket={chatSocket} />} />
						</Route>
						<Route
							path="/login"
							element={
								<ProtectedRoute
									redirectPath="/"
									toCheck={!!currentUser}
								>
									<Login />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/Test"
							element={
								<ProtectedRoute
									redirectPath="/"
									toCheck={!!currentUser}
								>
									<Log />
								</ProtectedRoute>
							}
						/>
					</Routes>
				</AnimatePresence>
			</userContext.Provider>
		</div>
	);
};

export default App;

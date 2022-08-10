import Navigation from "./components/Navigation";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ProtectedRoute from "./components/common/ProtectedRoute";
import { userContext } from "./components/helpers/context";
import { AnimatePresence } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import Log from "./components/pages/login/Log";
import Login from "./components/pages/login/Login";
import Home from "./components/pages/Home";
import Chat from "./components/pages/chat/Chat";
import Profile from "./components/pages/Profile/Profile";
import FriendsList from "./components/pages/Profile/friends/FriendsList";
import MatchHistory from "./components/pages/Profile/matchHistory/MatchHistory";
import AchievementsBoard from "./components/pages/Profile/achievements/AchievementsBoard";
import Game from "./components/game/Game";
import React from "react";
import { io } from "socket.io-client";
import GameWatch from "./components/game/GameWatch";
import InviteCard from "./components/game/InviteCard";

const App: React.FC = () => {
	const [currentUser, setCurrentUser] = useState("");
	const [userSocket, setSocket] = useState<any>();
	const [chatSocket, setChatSocket] = useState<any>();
	const [gameSocket, setGameSocket] = useState<any>();
	const [updated, setupdated] = useState(0);
	const [updatedRelation, setUpdated] = useState(0);
	const [showInvite, setShowInvite] = useState(false);

	const [isInvated, setIsInvated] = useState(false);
	const navigate = useNavigate();
	const isMobile = useMediaQuery({
		query: "(max-width: 767px)",
	});

	useEffect((): any => {
		const userStorage = localStorage.getItem("CurrentUser");
		if (userStorage) setCurrentUser(JSON.parse(userStorage));
		const socket = io(`${process.env.REACT_APP_BACKEND_URL}user`, {
			query: { user: userStorage },
			withCredentials: true,
		}).connect();
		const socket_chat = io(`${process.env.REACT_APP_BACKEND_URL}chat`, {
			withCredentials: true,
		}).connect();
		const socket_game = io(`${process.env.REACT_APP_BACKEND_URL}game`, {
			query: { user: userStorage },
			withCredentials: true,
		}).connect();

		socket.on("client status", () => {
			setupdated((prev) => {
				return prev + 1;
			});
		});
		socket.on("relation status", (res) => {
			//if (res.message === "friend req"){
			//	setUser(prev => {
			//		return res.user;
			//	})
			//	setShowInvite(prev => {
			//		return true
			//	})
			//}
			setUpdated((prev) => {
				return prev + 1;
			});
		});
		setSocket(socket);
		setChatSocket(socket_chat);
		setGameSocket(socket_game);
		// socket_game.emit("online");
		socket_game.on("inviteFrined", (data) => {
			setIsInvated(true);
			// alert(data);
		});

		return () => {
			userSocket.off("client status");
			userSocket.off("relation status");
			gameSocket.off("inviteFrined");
			userSocket.disconnect();
			socket_chat.disconnect();
			gameSocket.disconnect();
		};
	}, []);
	// useEffect(() => {
	// 	if (gameSocket)
	// 	{
	// 		// alert("game socket connected");
	// 		gameSocket.emit("online" );
	// 	}
	// },[gameSocket])

	return (
		<userContext.Provider
			value={{
				currentUser,
				setCurrentUser,
				isMobile,
				userSocket,
				updated,
				updatedRelation,
				chatSocket,
				gameSocket,
			}}
		>
			{isInvated && (
				<div
					onClick={() => {
						gameSocket.emit("acceptinvite", {});
						navigate("/game");
					}}
				>
					{" "}
					move to paly{" "}
				</div>
			)}
			<div className="h-screen text-4xl font-bold text-center App">
				<AnimatePresence exitBeforeEnter>
					{showInvite && (
						<InviteCard
							handleDecline={() => setShowInvite(false)}
							opUser={currentUser}
							handleAccept={() => {
								alert("OK");
							}}
						/>
					)}
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
							<Route
								path="profile/:username"
								element={<Profile />}
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
							<Route path="game" element={<Game />} />
							<Route
								path="gamewatch/:gameid"
								element={<GameWatch />}
							/>
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

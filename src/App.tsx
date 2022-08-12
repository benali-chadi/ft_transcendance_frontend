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
import Game from "./components/pages/game/Game";
import React from "react";
import { io } from "socket.io-client";
import InviteCard from "./components/common/InviteCard";
import GamePage from "./components/pages/game/Game";
import { Socket } from "socket.io-client";
import WaitGame from "./components/common/WaitGame";

const App: React.FC = () => {
	const [currentUser, setCurrentUser] = useState("");
	const [userSocket, setSocket] = useState<any>();
	const [chatSocket, setChatSocket] = useState<any>();
	const [gameSocket, setGameSocket] = useState<any>();
	const [updated, setupdated] = useState(0);
	const [updatedRelation, setUpdated] = useState(0);
	const [showInvite, setShowInvite] = useState(false);
	const [inviteMgs, setInvitemsg] = useState("");
	const [r_user, setRuser] = useState<any>(null)
	const [isInvated, setIsInvated] = useState(false);
	const [room_notif, setNotif] = useState(0);

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
		socket_chat.on("chat_notif", (res) =>{
			setNotif(prev => {
				return res.room_id
			})
		})
		socket.on("client status", () => {
			setupdated((prev) => {
				return prev + 1;
			});
		});
		socket.on("relation status", (res) => {
			if (res.msg === "friend req"){
				setRuser(prev => {
					return res.user;
				})
				setShowInvite(prev => {
					return true
				})
				setInvitemsg(prev => {
					return "Want to be your friend"
				})
			}
			setUpdated((prev) => {
				return prev + 1;
			});
		});
		socket_game.on("invitedGame", (data) =>{
			setRuser(prev => {
				return data.user;
			})
			setShowInvite(prev => {
				return true
			})
			setInvitemsg(prev => {
				return "Want to be play with you"
			})
		})
		socket_game.on("acceptedChallenge" ,(data)=>{
			navigate("/game");
		})
		setGameSocket(socket_game);
		setChatSocket(socket_chat);
		setSocket(socket);
	
		return () => {
			userSocket.off("client status");
			userSocket.off("relation status");
			socket_game.off("acceptedChallenge")
			socket_game.removeAllListeners();
			socket_game.disconnect();
			socket_chat.removeAllListeners();
			socket_chat.disconnect();
			userSocket.removeAllListeners();
			userSocket.disconnect();		
		};
	}, []);

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
				room_notif,
				setNotif
			}}
		>
			<div className="h-screen text-4xl font-bold text-center App">
				{showInvite && (
					<InviteCard
						handleCancel={() => {setShowInvite(false)}}
						opUser={r_user}
						msg={inviteMgs}
					/>
				)}
				
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
							<Route path="game" element={<GamePage />} />
							{/* <Route
								path="gamewatch/:gameid"
								element={<GameWatch />}
							/> */}
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

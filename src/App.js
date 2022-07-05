import Navigation from "./components/Navigation";
import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import ProtectedRoute from "./components/common/ProtectedRoute";
import { userContext } from "./components/helpers/context";
import { AnimatePresence } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import axios from "axios";
import Log from "./components/pages/loginPage/Log";
import Login from "./components/pages/loginPage/Login";
import Home from "./components/pages/Home";
import Chat from "./components/pages/chatPage/Chat";
// import logo42 from "./img/42logo.svg"

function App() {
	const [user, setUser] = useState(null);

	useEffect(() => {
		async function getUserData() {
			try {
				let obj = await axios.post(
					"http://localhost:9000/me",
					{},
					{ withCredentials: true }
				);

				if (obj.data.success) setUser(obj.data.user);
			} catch (e) {}
		}
		getUserData();
	}, []);

	const isMobile = useMediaQuery({
		query: "(max-width: 767px)",
	});
	const location = useLocation();

	return (
		<div className="h-screen text-4xl font-bold text-center App">
			<userContext.Provider value={{ user, setUser, isMobile }}>
				<AnimatePresence exitBeforeEnter>
					<Routes location={location} key={location.key}>
						<Route
							path="/"
							element={
								<ProtectedRoute toCheck={!user}>
									<Navigation />
								</ProtectedRoute>
							}
						>
							<Route path="" element={<Home />} />
							<Route path="profile" />
							<Route path="chat" element={<Chat />} />
						</Route>
						<Route
							path="/login"
							element={
								<ProtectedRoute
									redirectPath="/"
									toCheck={!!user}
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
									toCheck={!!user}
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
}

export default App;

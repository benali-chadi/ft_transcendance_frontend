import Home from "./components/Home";
import Navigation from "./components/Navigation";
import Login from "./components/Login";
import { Route, Routes, useLocation } from "react-router-dom";
import { useState } from "react";
import ProtectedRoute from "./components/common/ProtectedRoute";
import { userContext } from "./components/helpers/context";
import { AnimatePresence } from "framer-motion";
import { useMediaQuery } from "react-responsive";
// import logo42 from "./img/42logo.svg"

function App() {
	const [user, setUser] = useState(null);

	const isMobile = useMediaQuery({
		query: "(max-width: 767px)",
	});
	const location = useLocation();

	return (
		<div className="h-screen text-4xl font-bold text-center App">
			<userContext.Provider value={{ user, setUser, isMobile }}>
				<AnimatePresence exitBeforeEnter>
					<Routes location={location} key={location.key}>
						<Route path="/login" element={<Login />} />

						<Route
							path="/"
							element={
								<ProtectedRoute>
									<Navigation />
								</ProtectedRoute>
							}
						>
							<Route path="" element={<Home />} />
							<Route path="profile" />
							<Route path="chat" />
						</Route>
					</Routes>
				</AnimatePresence>
			</userContext.Provider>
		</div>
	);
}

export default App;

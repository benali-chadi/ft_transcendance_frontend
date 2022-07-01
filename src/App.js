import Home from "./components/Home";
import Navigation from "./components/Navigation";
import Login from "./components/Login";
import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import ProtectedRoute from "./components/common/ProtectedRoute";
import { userContext } from "./components/helpers/context";
import { AnimatePresence } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import { Dummy } from "./components/dummy";
import axios from "axios";
// import logo42 from "./img/42logo.svg"

function App() {
	const [user, setUser] = useState({});


	useEffect(() => {
		

		console.log("HWllo ");
		async  function dummy()
		{			console.log("dd")
			try {
			let obj = await  axios.post("http://localhost:9000/me", {} , {withCredentials : true});
		
				setUser(obj.data.user);
			}catch(e) {
			}
		}
		dummy();
	},[]);



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
							<Route path="chat" />
						</Route>
						<Route path="/login" element={
						<ProtectedRoute redirectPath="/" toCheck={user}>
							<Login />
						</ProtectedRoute>}/>

						<Route path="/Test" element={<Dummy />}   />
					</Routes>
				</AnimatePresence>
			</userContext.Provider>
		</div>
	);
}

export default App;

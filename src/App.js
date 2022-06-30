import Home from "./components/Home";
import Navigation from "./components/Navigation";
import Login from "./components/Login";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import ProtectedRoute from "./components/common/ProtectedRoute";
// import logo42 from "./img/42logo.svg"

function App() {
	const [user, setUser] = useState(null);

	return (
		<div className="h-screen text-4xl font-bold text-center App">
			<Routes>
				<Route
					path="/login"
					element={<Login user={user} setUser={setUser} />}
				/>
				<Route
					path="/"
					element={
						<ProtectedRoute user={user}>
							<Navigation setUser={setUser} />
						</ProtectedRoute>
					}
				>
					<Route path="" element={<Home user={user} />} />
					<Route path="profile" />
					<Route path="chat" />
				</Route>
			</Routes>
		</div>
	);
}

export default App;

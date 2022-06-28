import Home from "./Components/Home";
import FrontPage from "./Components/FrontPage"
import Login from "./Components/Login";
import {Route, Routes} from "react-router-dom"
// import logo42 from "./img/42logo.svg"

function App() {
  return (
    <div className="App h-screen text-4xl text-center font-bold">
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/" element={<FrontPage/>}>
          <Route path="" element={<Home/>}/>
          <Route path="profile"/>
          <Route path="chat"/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;

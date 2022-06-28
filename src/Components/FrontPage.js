import React from "react";
import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import logo from '../img/logo.png'


const FrontPage = () => {
    const [activePage, setActivePage] = useState(0);
    const [showNavBar, setShowNavBar] = useState(false);
    const navigate = useNavigate();
    const isMobile = useMediaQuery({
        query: '(max-width: 767px)'
    });


    const activeStyle = "text-my-light-violet";
    const inActiveStyle = "hover:text-blue-200";

    const handleLogOutClick = () => {
        navigate('/login');
    }
    const handleShowNavBarClick = () => {
        setShowNavBar(!showNavBar);
    }

    return ( 
        <div className="h-screen w-full overflow-auto bg-gray-300
                md:p-6 md:py-20 md:grid md:grid-cols-12">
            {/* The top Part */}
            <div className={`scroll w-full absolute top-0 left-0 z-10 p-4 flex justify-between
                    md:hidden
                    ${showNavBar && isMobile ? " bg-my-violet/70" : "bg-gray-300/20"}
                `}>
                    {
                        showNavBar && isMobile
                        ?
                            <i className="fa-solid fa-xmark cursor-pointer"
                            onClick={handleShowNavBarClick}></i>
                        :
                            <i className="fa-solid fa-bars cursor-pointer self-center" onClick={handleShowNavBarClick}></i>
                    }
                
                <img src={logo} alt="logo" className="h-10"/>
            </div>
            {/* NavBar */}
            <nav className={`${showNavBar && isMobile ? "activeNavStyle" : ""}`}>
                <ul>
                    <li>
                        <Link to="/">
                            <div className={`${!activePage ? activeStyle : inActiveStyle}`}
                                onClick={() =>{ 
                                    setActivePage(0);
                                    handleShowNavBarClick();
                                }}>
                                <i className="fa-solid fa-house"></i>
                                <h2 className="md:hidden">HOME</h2>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link to="profile">
                            <div className={`${activePage === 1 ? activeStyle : inActiveStyle}`}
                                onClick={() =>{ 
                                    setActivePage(1);
                                    handleShowNavBarClick();
                                }}>
                                <i className="fa-solid fa-user"></i>
                                <h2 className="md:hidden">PROFILE</h2>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link to="chat">
                            <div className={`${activePage === 2 ? activeStyle : inActiveStyle}`}
                                onClick={() =>{ 
                                    setActivePage(2);
                                    handleShowNavBarClick();
                                }}>
                                <i className="fa-solid fa-comment-dots"></i>
                                <h2 className="md:hidden">CHAT</h2>
                            </div>
                        </Link>
                    </li>
                </ul>
                    <div className="pb-8 text-white cursor-pointer"
                        onClick={handleLogOutClick}>
                        <i className="fa-solid fa-xs fa-right-from-bracket"></i>
                    </div>
            </nav>
            <div className="col-span-11">
                <Outlet />
            </div>
        </div>
     );
}
 
export default FrontPage;
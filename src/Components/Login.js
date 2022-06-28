import React from 'react';
import Button from './common/Button';
import SignUp from './Signup';

import background from '../img/login-background.jpg';
import logo from '../img/logo.png';
import { ReactComponent as Logo42} from "../img/42logo.svg";
import { useState } from 'react';
import { useNavigate } from 'react-router';

const Login = () => {
    const [showSignUp, setShowSignUp] = useState(false)
    const navigate = useNavigate();

    const backgroundStyle = {
        backgroundImage: `url('${background}')`,
    }

    const handleLoginClick = () => {
        setShowSignUp(!showSignUp);
    }
    const handleSaveClick = () => {
        navigate('/');
    }

    return (
        <div className="h-screen w-full bg-gradient-to-r from-[#D8E3F7] to-[#E4CFBA] overflow-auto
                        md:p-6 md:py-20">
            {
                showSignUp &&
                <SignUp handleCancelClick={handleLoginClick} handleSaveClick={handleSaveClick}/>
            }
            <div className="h-full min-h-max overflow-y-auto bg-50%w bg-no-repeat bg-top flex flex-col justify-end
                            md:rounded-large md:grid md:grid-cols-5 md:h-[50rem] md:grid-rows-1
                            md:bg-right md:bg-50%h
            " style={backgroundStyle}>
                <div className="h-3/5 scroll flex flex-col justify-center items-center gap-8 min-h-fit bg-my-dark-lavender py-8 rounded-t-large
                                md:col-span-3 md:h-full
                                md:justify-center md:rounded-large
                "
                >
                    <img src={logo} alt="logo" className="h-32 2xl:h-48" />
                    <h1 className="font-header font-extrabold text-4xl 
                                    xl:text-5xl 2xl:text-6xl">Welcome To Pong</h1>
                    <h2 className="font-header font-thin text-3xl 
                                xl:text-4xl 2xl:text-5xl">Login with Intra</h2>
                    <Button handleClick={handleLoginClick} color="bg-my-yellow" hoverColor="bg-yellow-300">
                        <Logo42 width="50%" height="100%" style={{
                            minHeight: "4rem",
                        }} />
                    </Button>
                </div>
            </div>
        </div>
    );
}
 
export default Login;
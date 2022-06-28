import React from "react";
import Section from "./common/Section";
import List from "./common/List";
import UserCard from "./common/UserCard";

import background from '../img/game-system/background.jpg'
import inviteImage from "../img/game-system/section2.jpg";
import randomImage from "../img/game-system/section1.jpg";

const Home = () => {
    const backgroundStyle = {
        backgroundImage: `url('${background}')`,
    }

    return ( 
        <div className="h-full min-h-max bg-white overflow-auto
                        md:rounded-large  md:rounded-l-none md:grid 
                        md:grid-cols-5 md:grid-rows-1 
        ">
            {/* Game System */}
            <div className="scroll p-8 h-3/5 min-h-max rounded-b-large overflow-auto bg-no-repeat bg-cover
                md:col-span-3 md:h-full
                md:justify-center md:rounded-large md:rounded-l-none
            " style={backgroundStyle}>
            {/* Headers */}
                <div className="flex flex-col justify-center mb-3 sticky items-start top-5 left-3
                            ">
                    <h1 className="text-my-yellow font-extrabold text-6xl">PONG</h1>
                    <h2 className="text-my-yellow font-bold">Create a Game</h2>
                </div>
            {/* Sections */}
                <div className="h-full flex flex-col justify-center gap-4

                ">
                    <Section title="Invite Friends" image={inviteImage} color="bg-my-orange" />
                    <Section title="Random" image={randomImage} color="bg-my-green" />
                </div>
            </div>
            {/* The Right\bottom Side */}
            <div className="scroll p-8 flex flex-col gap-4 overflow-auto
            md:col-span-2">
                {/* User */}
                <div className="hidden h-16 w-16 md:block">
                    <UserCard username="username" level="level"/>
                </div>
            {/* Lists */}
                <List title="leaderboard" icon="fa-solid fa-crown fa-xs">

                </List>
                <List title="Currently Playing" icon="fa-solid fa-table-tennis-paddle-ball fa-xs" >

                </List>
            </div>
        </div>
    );
}
 
export default Home;
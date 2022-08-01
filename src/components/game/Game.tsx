import React, { FC } from "react";
import { useContext } from "react";
import { userContext } from "../../helpers/context";
// import pongRackets from "../../../../img/table-tennis.png";
import { UserState } from "../../helpers/context";




const Game: FC = () => {
	return (
        <div className="absolute inset-0 z-10 w-full h-screen px-6 py-20 bg-my-blue md:relative md:h-full">
			<h1>Game</h1>
		</div>
	);
}

export default Game;
import React, { FC, useContext, useEffect, useRef, useState } from "react"
import { getLeadingCommentRanges } from "typescript";
import GameOverCard from "../../game/GameOverCard";
import { userContext, UserState } from "../../helpers/context";
import {Game, Player, ball} from "../../helpers/game"

const GamePage: FC = () => {
	
	const [ room_name, setRoomName ] = useState<string>();
	const { gameSocket, currentUser } = useContext<UserState>(userContext);
	const [winner, setWinner] = useState<string>();
	const [over, setOver] = useState<boolean>(false);
	const canvasRef = useRef(null);
	const [IsPlayer, setIsPlayer] = useState<boolean>(false)

	const room_ref = useRef("");

	const drawRect = (ctx:CanvasRenderingContext2D,x:number, y:number, w:number, h:number, color:string) => {
		ctx.fillStyle = color;
		ctx.fillRect(x, y, w, h);
	}

	const drawCircle = (ctx:CanvasRenderingContext2D,x:number, y:number, r:number, color:string) => {
		ctx.fillStyle = color;
		ctx.beginPath();
		ctx.arc(x, y, r, 0, Math.PI * 2, false);
		ctx.closePath();
		ctx.fill();
	}

	const drawText = (ctx:CanvasRenderingContext2D,text:string,x:number, y:number, color:string, h:number) => {
		ctx.fillStyle = color;
		ctx.font = `${h / 8}px fantasy`;
		ctx.fillText(text, x, y);
	}

	const  DrawGame = (canvasRef : CanvasRenderingContext2D, game : Game) => {
		let Width = canvasRef.canvas.width;
		let Height = canvasRef.canvas.height;

		drawRect(canvasRef,	0, 0, Width, Height, "#000");
		drawText(canvasRef,	game.player1.score.toString(), Width /4, Height/5, "#FFF", Height);
		drawText(canvasRef,	game.player2.score.toString(), 3*Width /4, Height/5, "#FFF", Height);
		drawRect(canvasRef,	game.player1.x * Width ,game.player1.y * Height, game.player1.width * Width, game.player1.height * Height, "#FFF");
		drawRect(canvasRef,	game.player2.x * Width ,game.player2.y * Height, game.player2.width * Width, game.player2.height * Height, "#FFF");
		drawCircle(canvasRef, game.ball.x * Width, game.ball.y * Height, game.ball.radius * (Width + Height), game.ball.color);
	}

	window.addEventListener('keydown', (event) => {
		if (event.key === "ArrowUp" ) {
			gameSocket?.emit("keypress" , {key: "ArrowUp", room: room_name});
		}
		if (event.key === "ArrowDown") {
			gameSocket?.emit("keypress", {key: "ArrowDown", room: room_name});
		}
	});

	useEffect(() : any => {
		const canvas : any =  canvasRef.current;
		const ctx = canvas.getContext('2d');
		if (gameSocket)
		{
			gameSocket.on("startGame", (game : Game) => {
				DrawGame(ctx, game);
				setRoomName(game.room);
				room_ref.current = game.room;
				setIsPlayer(true);
			});

			gameSocket.on("updateframe", (game : Game) => {
				DrawGame(ctx, game);
				room_ref.current = game.room;
			});

			gameSocket.on("gameOver", (res : any) => {
				setWinner(prev => {
					return res.winner;
				});
				setOver(prev => {
					return true;
				})
			});

			return () => {
				gameSocket.emit("leftGame", {room: room_ref.current}, (res)=>{
				});
				gameSocket.off("startGame", (res)=>{});
				gameSocket.off("updateframe", (res)=>{});
				gameSocket.off("gameOver", (res)=>{});
				
			}
		}
		
	}, [])

	return(
		<div className="App"  >
			<canvas  style={{border: "black solid 1px"}} ref={canvasRef} id="canvas" width="1000" height="500"></canvas>
			{over && IsPlayer && <GameOverCard win={currentUser.username === winner} IsPlayer={IsPlayer} 
				winner={winner}/>}
    	</div>
	);
};

export default GamePage;
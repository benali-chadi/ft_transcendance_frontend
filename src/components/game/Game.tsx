import React, { FC, useContext, useRef } from "react";
import Sketch from "react-p5";
import p5Types from "p5"; //Import this for typechecking and intellisense
//import socketIOClient from "socket.io-client";
import { io } from "socket.io-client";
import OnevsoneCard from "./OnevsoneCard";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import GameOverCard from "./GameOverCard";
import { userContext, UserState } from "../helpers/context";

const ENDPOINT = "http://localhost:3000/game";

const aspectRatio = 16 / 9;

const PLAYER_UP = 38; // up arrow
const PLAYER_DOWN = 40; // down arrow
const OPPONENT_UP = 90; /* z */
const OPPONENT_DOWN = 98; /* x */
let SPPED = 0.01;
let SPPED_ball = 0.002;
let directionX = 1;
let directionY = 1;
let rn = Math.floor(Math.random() * 100) + 1;

function withParams(Component) {
	return props => <Component {...props} conext={useContext<UserState>(userContext)} />;
  }

// const { gameSocket } = useContext<UserState>(userContext);
  class Game extends React.Component {
	
	state = {
		number_image: 1,
		isMaster: false,
		gameStart: false,
		gameOver: false,
		username: "",
		avatar: "",
		socket: this.props.conext.gameSocket,
		width: 0,
		height: 0,
		master: {
			x: 0,
			y: 0,
		},
		slave: {
			x: 0,
			y: 0,
		},
		ball: {
			x: 0.5,
			y: 0.5,
		},
		piddaleSize: 0,
		lastWidth: 0,
		lastHeight: 0,
		myRef: null,
		obj: {
			id: "",
			Player1UserName: "",
			Player2UserName: "",
			Player1Score: 0,
			Player2Score: 0,
			Player1Avatar: "",
			Player2Avatar: "",
		},
	};
	image: any;
	parent: Element;
	lastChangeInX: boolean = false;
	myRef: React.RefObject<HTMLDivElement>;

	constructor(props: any) {
		super(props);
		this.startGame = this.startGame.bind(this);
		this.updateDimensions = this.updateDimensions.bind(this);
		this.myRef = React.createRef();
	}

	updateDimensions = () => {
		let width = this.myRef.current
			? this.myRef.current.clientWidth
			: window.innerWidth * 0.8;
		let height = width / aspectRatio;

		//we flow height in case of overflowing parent div
		if (this.myRef.current && this.myRef.current.clientHeight < height) {
			height = this.myRef.current
				? this.myRef.current.clientHeight
				: window.innerHeight * 0.8;
			width = height * aspectRatio;
		}

		this.state.slave.x = width - 25;
		this.state.master.x = 5;

		this.setState({
			piddaleSize: height / 8,
			piddaleSizeWitdth: (height / 8) * 0.8,
		});
		this.setState({
			width: width,
			height: height,
		});
	};

	ballX(): number {
		return this.state.width * this.state.ball.x;
	}
	ballY(): number {
		return this.state.height * this.state.ball.y;
	}

	getSlaveY(): number {
		return this.state.slave.y * this.state.height;
	}
	getMasterY(): number {
		return this.state.master.y * this.state.height;
	}

	keyInput = ({ keyCode }: any) => {
		const PLAYER_UP = 38; // up arrow
		const PLAYER_DOWN = 40; // down arrow
		const OPPONENT_UP = 90; /* z */
		const OPPONENT_DOWN = 98; /* x */
	};

	componentDidMount() {
		let width = this.myRef.current
			? this.myRef.current.clientWidth
			: window.innerWidth * 0.8;
		let height = width / aspectRatio;
		if (this.myRef.current && this.myRef.current.clientHeight < height) {
			height = this.myRef.current
				? this.myRef.current.clientHeight
				: window.innerHeight * 0.8;
			width = height * aspectRatio;
			// console.log("resize");
		}
		this.setState({ lastWidth: width, lastheight: height });
		this.setState({ ball: { x: 0.5, y: 0.4 } });
		window.addEventListener("resize", this.updateDimensions);
		this.setState({
			// width: (window.innerWidth) * 0.8,
			width: width,
			height: height,
		});

		this.setState({ master: { x: 5, y: 0.45 } });
		this.setState({ slave: { x: width - 25, y: 0.45 } });
		this.setState({ piddaleSize: height / 8 });
		document.onkeydown = this.keyInput;

		// const search = useLocation().search;
		let search = window.location.search;
		let params = new URLSearchParams(search);
		let username = params.get('username');
	
		if (username) {
			// alert("ddd")
			this.state.socket.emit("inviteFrined", { username: username });
		}else {
			this.state.socket.emit("participate", { startGame: true, random: rn });
		}
		// console.log(this.state.socket)
		this.state.socket.on("startTheGame", (data: any) => {
		
			this.setState({ gameStart: true });
			this.setState({ isMaster: data.isMaster });
			this.setState({ obj: data });
		});

		this.state.socket.on("playmove", (data: any) => {
			if (this.state.isMaster) {
				this.state.slave.y = data.y;
			} else {
				this.state.master.y = data.y;
			}
		});
		this.state.socket.on("circle", (data: any) => {
			if (!this.state.isMaster) {
				this.state.ball.x = data.x;
				this.state.ball.y = data.y;
			}
		});
		// this.state.
		this.state.socket.on("score", (data: any) => {
			// if (!this.state.isMaster) {
			this.state.obj.Player1Score = data.score1;
			this.state.obj.Player2Score = data.score2;
			// alert("ss")
			this.setState({ obj: this.state.obj });

			// }
		});
		this.state.socket.on("stopgame", (data: any) => {
			this.setState({ gameStart: false });
			this.setState({ gameOver: true });
		});
	}

	componentWillUnmount() {
		this.state.socket.close();
		window.removeEventListener("resize", this.updateDimensions);
	}

	setup = (p5: p5Types, canvasParentRef: Element) => {
		p5.createCanvas(500, 500).parent(canvasParentRef);
		this.parent = canvasParentRef;
	};

	sketch = (p5: p5Types) => {
		// this.image =   p5.loadImage("../../img/neon-frame.mov");
		p5.setup = () => {
			p5.createCanvas(this.state.width, this.state.height);
			// p5.image(this.image,0,0);
		};

		let img1: p5Types.Image = p5.loadImage("skin1.jpg");
		let img2: p5Types.Image = p5.loadImage("skin2.jpg");
		let img3: p5Types.Image = p5.loadImage("skin3.jpg");
		// alert(img1.width);
		// let img2;

		p5.draw = () => {
			// alert(img1)
			if (this.state.gameStart == false) return;

			if (this.state.isMaster) {
				this.state.socket.emit("circle", {
					x: this.state.ball.x,
					y: this.state.ball.y,
				});
			}
			if (
				this.ballX() + 10 > this.state.slave.x &&
				this.ballX() + 10 < this.state.slave.x + 20 &&
				this.ballY() + 10 > this.getSlaveY() &&
				this.ballY() + 10 < this.getSlaveY() + this.state.piddaleSize
			) {
				if (this.lastChangeInX == false) {
					directionX = -directionX;

					this.lastChangeInX = true;
				}
			} else if (
				this.ballX() - 10 > this.state.master.x &&
				this.ballX() - 10 < this.state.master.x + 20 &&
				this.ballY() - 10 > this.getMasterY() &&
				this.ballY() - 10 < this.getMasterY() + this.state.piddaleSize
			) {
				this.lastChangeInX = false;
				directionX = -directionX;
			}
			if (this.ballY() > this.state.height || this.ballY() < 0) {
				this.lastChangeInX = false;
				directionY = -directionY;
			} else if (this.ballX() > this.state.width || this.ballX() < 0) {
				if (this.state.isMaster) {
					if (this.ballX() > this.state.width) {
						// this.state.obj.Player1Score++;
						this.state.socket.emit("goal", { isMaster: true });
					} else {
						// this.state.obj.Player2Score++;
						this.state.socket.emit("goal", { isMaster: false });
					}
				}
				this.state.ball.x = 0.5;
				this.state.ball.y = 0.5;
				this.lastChangeInX = false;
				directionX = -directionX;
			}
			p5.createCanvas(this.state.width, this.state.height).parent(
				this.parent
			);
			if (this.state.number_image === 1)
				p5.image(img1, 0, 0, this.state.width, this.state.height);
			else if (this.state.number_image === 2)
				p5.image(img2, 0, 0, this.state.width, this.state.height);
			else if (this.state.number_image === 3)
				p5.image(img3, 0, 0, this.state.width, this.state.height);
			// p5.background(this.state.bg_color);
			p5.rect(
				this.state.master.x,
				this.getMasterY(),
				15,
				this.state.piddaleSize
			);
			// p5.fill(80, 150, 80);
			p5.rect(
				this.state.slave.x,
				this.getSlaveY(),
				15,
				this.state.piddaleSize
			);
			// p5.fill(80, 70, 80);
			// console.log(img1)

			let _ballX = this.state.ball.x + SPPED_ball * directionX;
			let _ballY = this.state.ball.y + SPPED_ball * directionY;
			this.state.ball.x = _ballX;
			this.state.ball.y = _ballY;
			p5.circle(this.ballX(), this.ballY(), 20);
			if (p5.keyIsDown(PLAYER_UP)) {
				if (this.state.isMaster) {
					console.log(this.ballY());
					if (this.getMasterY() > 0) {
						let num = (this.state.master.y -= SPPED);
						// this.setState({ master: { x: this.state.master.x, y: num } });
						this.state.master.y = num;
						// this.state.socket.emit("playmove",
						this.state.socket.emit("playmove", {
							y: this.state.master.y,
							isMaster: this.state.isMaster,
						});
					}
				} else {
					if (this.getSlaveY() > 0) {
						this.state.slave.y -= SPPED;
						this.state.socket.emit("playmove", {
							y: this.state.slave.y,
							isMaster: this.state.isMaster,
						});
					}
				}
			}
			if (p5.keyIsDown(PLAYER_DOWN)) {
				if (this.state.isMaster) {
					if (
						this.getMasterY() + this.state.piddaleSize <
						this.state.height
					) {
						this.state.master.y += SPPED;
						this.state.socket.emit("playmove", {
							y: this.state.master.y,
							isMaster: this.state.isMaster,
						});
					}
				} else {
					if (
						this.getSlaveY() + this.state.piddaleSize <
						this.state.height
					) {
						this.state.slave.y += SPPED;
						this.state.socket.emit("playmove", {
							y: this.state.slave.y,
							isMaster: this.state.isMaster,
						});
					}
				}
			}
		};
	};

	startGame() {
		// this.state.socket.emit("participate", { startGame: true, random: rn });
	}

	render() {
		return (
			<div className="flex flex-col items-center justify-center h-screen gap-3 px-4 bg-my-lavender md:h-full md:rounded-r-large">
				{/* <button onClick={this.startGame}>start game click</button> */}
				<div
					className=" w-[90%] md:h-[50%] h-[30%] flex flex-col justify-center items-center gap-2"
					ref={this.myRef}
				>
					{this.state.gameOver && <GameOverCard win={true} />}
					<OnevsoneCard
						username1={this.state.obj.Player1UserName}
						username2={this.state.obj.Player2UserName}
						score1={this.state.obj.Player1Score}
						score2={this.state.obj.Player2Score}
						avatar1={this.state.obj.Player1Avatar}
						avatar2={this.state.obj.Player2Avatar}
					/>
					<Sketch setup={this.setup} draw={this.sketch} />
					<h1 className="text-blue-600">Choose Skine</h1>
					<div className="grid grid-cols-3 gap-4">
						<button
							className="bg-indigo-500"
							onClick={() => {
								this.state.number_image = 1;
							}}
						>
							<img
								src={require("../../img/skin1.jpg")}
								alt="skin1"
							/>
						</button>
						<button
							className="bg-red-500"
							onClick={() => {
								this.state.number_image = 2;
							}}
						>
							<img
								src={require("../../img/skin2.jpg")}
								alt="skin1"
							/>
						</button>
						<button
							className="bg-yellow-500"
							onClick={() => {
								this.state.number_image = 3;
							}}
						>
							<img
								src={require("../../img/skin3.jpg")}
								alt="skin1"
							/>
						</button>
					</div>
				</div>
			</div>
		);
	}
}

export default withParams(Game);
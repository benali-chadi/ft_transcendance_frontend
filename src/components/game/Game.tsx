import React, { useRef } from "react";
import Sketch from "react-p5";
import p5Types from "p5"; //Import this for typechecking and intellisense
//import socketIOClient from "socket.io-client";
import { io } from "socket.io-client";

const ENDPOINT = "http://localhost:3000/game";

const PLAYER_UP = 38; // up arrow
const PLAYER_DOWN = 40; // down arrow
const OPPONENT_UP = 90; /* z */
const OPPONENT_DOWN = 98; /* x */
let SPPED = 0.01;
let SPPED_ball = 0.002;
let directionX = 1;
let directionY = 1;
let rn = Math.floor(Math.random() * 100) + 1;


export default class Game extends React.Component {
  state = {
    isMaster: false,
    gameStart: false,
    username: "",
	avatar: "",
    socket: io(ENDPOINT, { withCredentials: true }),
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
  };
 image : any;
 parent : Element;
 lastChangeInX  : boolean= false;
  constructor(props: any) {
    super(props);
    this.startGame = this.startGame.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
  }
  updateDimensions = () => {
    let width = window.innerWidth * 0.8;
    let height = window.innerHeight * 0.8;
    let slaveY = this.state.slave.y;
    let masterY = this.state.master.y;
    this.state.slave.x = width - 25;
    this.state.master.x = 5;
    // this.setState({ ball: { x: 0.5, y: 0.5 } });
    // this.state.ball.x÷
    this.setState({ piddaleSize: height / 8 });
    this.setState({
      width: window.innerWidth * 0.8,
      height: window.innerHeight * 0.8,
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
    let width = window.innerWidth * 0.8;
    let height = window.innerHeight * 0.8;
    this.setState({ lastWidth: width, lastheight: height });
    this.setState({ ball: { x: 0.5, y: 0.4}});
    window.addEventListener("resize", this.updateDimensions);
    this.setState({
      width: window.innerWidth * 0.8,
      height: window.innerHeight * 0.8,
    });
    this.setState({ master: { x: 5, y: 0.5 } });
    this.setState({ slave: { x:  width - 25, y: 0.5 } });
    this.setState({ piddaleSize: height / 8 });
    document.onkeydown = this.keyInput;
    this.state.socket.on("startTheGame", (data: any) => {
      this.setState({ isMaster: data.isMaster });
      this.setState({ username: data.oppisteName });
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
    this.image =   p5.loadImage("./test.jpeg");
    p5.setup = () => {
      p5.createCanvas(this.state.width, this.state.height);
      // p5.image(this.image,0,0);
    };

    let img1 : p5Types.Image =  p5.loadImage("./test.jpeg");
    let img2;
  
    // p5.preload = () => {
    //   img1 = p5.loadImage("./test.jpeg");
    //   // img2 = p5.loadImage("./test.jpeg");
    // };
  

    p5.draw = () => {
      if (this.state.isMaster) {
        this.state.socket.emit("circle", {
          x: this.state.ball.x,
          y: this.state.ball.y,
        });
      }
      if (
        this.ballX()  +10> this.state.slave.x &&
        this.ballX() +10 < this.state.slave.x + 20 &&
        this.ballY() +10 > this.getSlaveY()&&
        this.ballY() +  10 < this.getSlaveY()+   this.state.piddaleSize
      )
	 {
		// if (this.ballY()< this.getSlaveY()+ this.state.piddaleSize)
		// {
		// 	alert("You lose");
		// 	this.state.ball.x = 0.5;
		// 	this.state.ball.y = 0.5;
		// }
        console.log("1111111111");
		if (this.lastChangeInX == false )
		{
        	directionX = -directionX;
			this.lastChangeInX = true;
		}
      }
      else if (
        this.ballX() -10 > this.state.master.x &&
        this.ballX() -10 < this.state.master.x + 20 &&
        this.ballY()  -10 > this.getMasterY() &&
        this.ballY()  -10 < this.getMasterY() + this.state.piddaleSize
      ) {
        console.log("2222");
		// if (this.ballY() < this.getMasterY() + this.state.piddaleSize ) {
		// 	// alert("you win");
		// 	this.state.ball.x = 0.5;
		// 	this.state.ball.y = 0.5;
		// }
		// if (this.lastChangeInX == false )
		// {
			this.lastChangeInX = false;

			 directionX = -directionX;
		// }
      }
      if (this.ballY() > this.state.height || this.ballY() < 0) {
        console.log("hit the wall 1");
		this.lastChangeInX = false;

        directionY = -directionY;
      }
      else if (this.ballX() > this.state.width || this.ballX() < 0) {
        console.log("hit the wall2");
		// alert("you lose");
		this.state.ball.x = 0.5;
		this.state.ball.y = 0.5;
		this.lastChangeInX = false;
        directionX = -directionX;
      }  
      p5.createCanvas(this.state.width, this.state.height).parent(this.parent);

      p5.background(0, 0, 80);
      p5.rect(
        this.state.master.x,
        this.getMasterY(),
        20,
        this.state.piddaleSize
      );
      // p5.fill(80, 150, 80);
      p5.rect(this.state.slave.x, this.getSlaveY(), 20, this.state.piddaleSize);
      p5.fill(80, 70, 80);

      let _ballX = this.state.ball.x + (SPPED_ball * directionX);
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
            this.state.socket.emit("playmove", { y: this.state.master.y });
          }
        } else {
          if (this.getSlaveY() > 0) {
            this.state.slave.y -= SPPED;
            this.state.socket.emit("playmove", { y: this.state.slave.y });
          }
        }
      }
      if (p5.keyIsDown(PLAYER_DOWN)) {
        if (this.state.isMaster) {
          if (this.getMasterY() + this.state.piddaleSize < this.state.height) {

            this.state.master.y += SPPED;
            this.state.socket.emit("playmove", { y: this.state.master.y });
          }
        } else {
          if (this.getSlaveY() + this.state.piddaleSize < this.state.height) {
            this.state.slave.y += SPPED;
            this.state.socket.emit("playmove", { y: this.state.slave.y });
          }
        }
      }
    };
  };

  startGame() {
	console.log("startGame");
    this.state.socket.emit("participate", { startGame: true, random: rn });
  }

  render() {
    return (
      <div>
        <button onClick={this.startGame}>start game  click</button>
        {<h1> you vs {this.state.username} </h1>}
        <Sketch setup={this.setup} draw={this.sketch} />
      </div>
    );
  }
}
import React, { useRef } from "react";
import Sketch from "react-p5";
import p5Types from "p5"; //Import this for typechecking and intellisense
//import socketIOClient from "socket.io-client";
import { io } from "socket.io-client";
import OnevsoneCard from "./OnevsoneCard";
import { useParams } from "react-router-dom";
// import { withRouter } from "react-router";
// import { withRouter } from "react-router";

const ENDPOINT = "http://localhost:3000/game";


function withParams(Component) {
  return props => <Component {...props} params={useParams()} />;
}


const aspectRatio = 16/9;

const PLAYER_UP = 38; // up arrow
const PLAYER_DOWN = 40; // down arrow
const OPPONENT_UP = 90; /* z */
const OPPONENT_DOWN = 98; /* x */
let SPPED = 0.01;
let SPPED_ball = 0.002;
let directionX = 1;
let directionY = 1;
let rn = Math.floor(Math.random() * 100) + 1;


//To remove



 class GameWatch extends React.Component {
  state = {
    bg_color:"'#3065c8'",
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
    myRef: null,
     obj : {
      id : "1",
      Player1UserName :  "ybarhdad",
      Player2UserName : "razaha",
      Player1Score : 0,
      Player2Score : 0,
      Player1Avatar : "https://cdn.intra.42.fr/users/small_ybarhdad.jpg",
      Player2Avatar : "https://cdn.intra.42.fr/users/small_razaha.jpg"
    }
  };
  image : any;
  parent : Element;
  lastChangeInX  : boolean= false;
  myRef: React.RefObject<HTMLDivElement>;
  
  
  constructor(props: any) {
    super(props);
    this.startGame = this.startGame.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
    this.myRef = React.createRef();
  }
  
  updateDimensions = () => {
    let width = this.myRef.current ? this.myRef.current.clientWidth : (window.innerWidth) * 0.8;
    let height = width / aspectRatio;
    
    //we flow height in case of overflowing parent div
    if( this.myRef.current && this.myRef.current.clientHeight < height)
    {
      height = this.myRef.current ? this.myRef.current.clientHeight : window.innerHeight * 0.8;
      width = height * aspectRatio;
    }


    this.state.slave.x = width - 25;
    this.state.master.x = 5;

    this.setState({ piddaleSize: height / 8 });
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
    
    let width = this.myRef.current ? this.myRef.current.clientWidth : (window.innerWidth) * 0.8;
    let height = width / aspectRatio;
    if( this.myRef.current && this.myRef.current.clientHeight < height)
    {
      height = this.myRef.current ? this.myRef.current.clientHeight : window.innerHeight * 0.8;
      width = height * aspectRatio;
    }
    this.setState({ lastWidth: width, lastheight: height });
    this.setState({ ball: { x: 0.5, y: 0.4}});
    window.addEventListener("resize", this.updateDimensions);
    this.setState({
      // width: (window.innerWidth) * 0.8,
      width: width,
      height: height,
    });


    this.setState({ master: { x: 5, y: 0.45 } });
    this.setState({ slave: { x:  width - 25, y: 0.45 } });
    this.setState({ piddaleSize: height / 8 });
    document.onkeydown = this.keyInput;
    this.state.socket.on("startTheGame", (data: any) => {
      this.setState({ isMaster: data.isMaster });
      this.setState({ username: data.oppisteName });
    });

    this.state.socket.on("playmove", (data: any) => {
      if (!data.isMaster) {
        this.state.slave.y = data.y;
      } else {
        this.state.master.y = data.y;
      }
    });
    this.state.socket.on("circle", (data: any) => {
      // if (!this.state.isMaster) {
        this.state.ball.x = data.x;
        this.state.ball.y = data.y;
      // }
    });
    let { gameid } = this.props.params;
    // alert(gameid);
    console.log("game id is : =======> "+ gameid);
    this.state.socket.emit("watchgame", {gameID : gameid, l: "dddddd"});
    this.state.socket.on("matchData", (data: any) => {
        
    });

    // this.state.socket.on("gameStart", (data: any) => {

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

    let img1 : p5Types.Image =  p5.loadImage("../../img/skin1.jpg");
    // let img1 : p5Types.Image =  p5.loadImage("../../img/skin2.jpg");
    // let img1 : p5Types.Image =  p5.loadImage("../../img/skin3.jpg");
    let img2;

  

    p5.draw = () => {
      p5.createCanvas(this.state.width  ,this.state.height).parent(this.parent);
      p5.image(img1,0,0);
      p5.background(this.state.bg_color);
      p5.rect(
        this.state.master.x,
        this.getMasterY(),
        20,
        this.state.piddaleSize
      );
      p5.rect(this.state.slave.x, this.getSlaveY(), 20, this.state.piddaleSize);
      p5.fill(80, 70, 80);
      p5.circle(this.ballX(), this.ballY(), 20);

    };
  };

  startGame() {
    this.state.socket.emit("participate", { startGame: true, random: rn });
  }

  render() {

    return (
      <div className="bg-my-lavender md:h-full h-screen md:rounded-r-large px-4 flex flex-col justify-center items-center gap-3">
        {/* <button onClick={this.startGame}>start game  click</button> */}
        <div className=" w-[90%] md:h-[50%] h-[30%] flex flex-col justify-center items-center gap-2" ref={this.myRef}>
          <OnevsoneCard username1={this.state.obj.Player1UserName} username2={this.state.obj.Player2UserName} score1={this.state.obj.Player1Score} score2={this.state.obj.Player2Score} avatar1={this.state.obj.Player1Avatar} avatar2={this.state.obj.Player2Avatar} />
          <Sketch setup={this.setup} draw={this.sketch}  />
          <h1 className="text-blue-600" >Choose Skine</h1>
          <div className="grid grid-cols-3 gap-4">
            <button className="bg-indigo-500" onClick={() => {
              this.state.bg_color = "#555555";
            }}>
              <img src={require("../../img/skin1.jpg")} alt="skin1" />
            </button>
            <button className="bg-red-500" onClick={() => {
              this.state.bg_color = "#999999";
            }}>
             <img src={require("../../img/skin2.jpg")} alt="skin1" />
            </button>
            <button className="bg-yellow-500" onClick={() => {
              this.state.bg_color = "#444444";
            }}>
              <img src={require("../../img/skin3.jpg")} alt="skin1" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default withParams(GameWatch);

import { useState, useRef, useEffect } from "react";
import useInterval from "../../src/useInterval";
import { Directions } from "./types";
import _, { indexOf } from "lodash";
import styles from "./snake-game.module.css";
import Image from "next/image";
import { Gestures } from "react-gesture-handler";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Backdrop } from "@mui/material";

const SnakeGameComponent = () => {
  // let CANVAS_SIZE = [800, 800];
  
  const [CANVAS_SIZE,setCANVAS_SIZE] = useState([800, 800])
  const SNAKE_START = [
    [8, 7],
    [8, 8],
  ];
  const APPLE_START = [8, 3];
  const SCALE = 40;
  const SPEED = 300;
  const [points, setPoints] = useState(0);
  const DIRECTIONS: Directions = {
    38: [0, -1], // up
    40: [0, 1], // down
    37: [-1, 0], // left
    39: [1, 0], // right
  };
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mainContainerRef = useRef(null)
  const [snake, setSnake] = useState(SNAKE_START);
  const [apple, setApple] = useState(APPLE_START);
  const [dir, setDir] = useState([0, -1]);
  const [speed, setSpeed] = useState<null | number>(null);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    // console.log("canvasRef", canvasRef);
    const context: CanvasRenderingContext2D =
      canvasRef.current.getContext("2d");
    context.setTransform(SCALE, 0, 0, SCALE, 0, 0);
    context.clearRect(0, 0, CANVAS_SIZE[0], CANVAS_SIZE[1]);
    context.fillStyle = "green";
    snake.forEach(([x, y]) => context.fillRect(x, y, 1, 1));
    context.fillStyle = "red";
    context.fillRect(apple[0], apple[1], 1, 1);
  }, [snake, apple, gameOver]);

  useEffect(() => {
    console.log("mainContainerRef",mainContainerRef.current.offsetWidth);
    if(mainContainerRef.current.offsetWidth < 641) {
      
      setCANVAS_SIZE([500,600])
    }
    
  }, []);

  const startGame = () => {
    console.log(" canvasRef.current", canvasRef.current);

    setSnake(SNAKE_START);
    setApple(APPLE_START);
    setDir([0, -1]);
    setSpeed(SPEED);
    setGameOver(false);
    setPoints(0);
    canvasRef.current.setAttribute("tabindex", "0");
    canvasRef.current.focus();
  };

  const createApple = () => {
    return apple.map((_, index) =>
      Math.floor(Math.random() * (CANVAS_SIZE[index] / SCALE))
    );
  };
  const endGame = () => {
    setSpeed(null);
    setGameOver(true);
  };

  const checkCollision = (piece, snk = snake) => {
    // console.log("piece", piece);

    if (
      piece[0] * SCALE >= CANVAS_SIZE[0] ||
      piece[0] * SCALE < 0 ||
      piece[1] * SCALE >= CANVAS_SIZE[1] ||
      piece[1] * SCALE < 0
    ) {
      return true;
    }

    for (const segment of snk) {
      if (piece[0] === segment[0] && piece[1] === segment[1]) return true;
    }

    return false;
  };

  const checkAppleCollision = (newSnake) => {
    if (newSnake[0][0] === apple[0] && newSnake[0][1] === apple[1]) {
      let newApple = createApple();
      while (checkCollision(newApple, newSnake)) {
        newApple = createApple();
      }
      setPoints((pValue) => pValue + 1);
      switch (points) {
        case 3:
          setSpeed((pValue) => pValue - 50);
          break;
        case 6:
          setSpeed((pValue) => pValue - 50);
          break;
        case 9:
          setSpeed((pValue) => pValue - 50);
          break;
        case 12:
          setSpeed((pValue) => pValue - 50);
          break;
        case 15:
          setSpeed((pValue) => pValue - 50);
          break;
      }
      setApple(newApple);
      return true;
    }
    return false;
  };

  const moveSnake = ({ keyCode }) => {
    const isUp = 38;
    const isDown = 40;
    const isLeft = 37;
    const isRight = 39;
    if (Number(keyCode) === isUp && _.isEqual(DIRECTIONS[40], dir)) {
      return;
    } else if (Number(keyCode) === isDown && _.isEqual(DIRECTIONS[38], dir)) {
      return;
    } else if (Number(keyCode) === isLeft && _.isEqual(DIRECTIONS[39], dir)) {
      return;
    } else if (Number(keyCode) === isRight && _.isEqual(DIRECTIONS[37], dir)) {
      return;
    }
    keyCode >= 37 && keyCode <= 40 && setDir(DIRECTIONS[keyCode]);
  };
  const moveSnakeMobile = (event) => {
    console.log("event", event);
    const { type } = event;
    console.log(type);

    // if (type === "panup") {
    //   if (_.isEqual(DIRECTIONS[40], dir)) {
    //     // return;
    //   } else {
    //     setDir((pV) => DIRECTIONS[38]);
    //   }
    // } else if (type === "pandown") {
    //   if (_.isEqual(DIRECTIONS[38], dir)) {
    //     // return;
    //   } else {
    //     setDir((pv) => DIRECTIONS[40]);
    //   }
    // } else if (type === "panleft") {
    //   if (_.isEqual(DIRECTIONS[39], dir)) {
    //     // return;
    //   } else {
    //     setDir((pv) => DIRECTIONS[37]);
    //   }
    // } else if (type === "panright") {
    //   if (_.isEqual(DIRECTIONS[37], dir)) {
    //     // return;
    //   } else {
    //     setDir((pv) => DIRECTIONS[39]);
    //   }
    // }

    // if (type === "panup" && _.isEqual(DIRECTIONS[40], dir)) {
    //   return;
    // } else if (type === "pandown" && _.isEqual(DIRECTIONS[38], dir)) {
    //   return;
    // } else if (type === "panleft" && _.isEqual(DIRECTIONS[39], dir)) {
    //   return;
    // } else if (type === "panright" && _.isEqual(DIRECTIONS[37], dir)) {
    //   return;
    // }
    switch (type) {
      case "panup":
        setDir((pV) => DIRECTIONS[38]);
        break;

      case "pandown":
        setDir((pv) => DIRECTIONS[40]);
        break;
      case "panleft":
        setDir((pv) => DIRECTIONS[37]);
        break;
      case "panright":
        setDir((pv) => DIRECTIONS[39]);
        break;
    }
    // keyCode >= 37 && keyCode <= 40 && setDir(DIRECTIONS[keyCode]);
  };

  const gameLoop = () => {
    const snakeCopy = JSON.parse(JSON.stringify(snake));
    const newSnakeHead = [snakeCopy[0][0] + dir[0], snakeCopy[0][1] + dir[1]];
    snakeCopy.unshift(newSnakeHead);
    if (checkCollision(newSnakeHead)) endGame();
    if (!checkAppleCollision(snakeCopy)) snakeCopy.pop();
    setSnake(snakeCopy);
  };

  useInterval(() => gameLoop(), speed);
  return (
    <Gestures
      recognizers={{
        Pan: {
          events: {
            panleft: moveSnakeMobile,
            panright: moveSnakeMobile,
            panup: moveSnakeMobile,
            pandown: moveSnakeMobile,
          },
        },
      }}
    >
      <div
        className=" block md:flex container md:w-screen"
        tabIndex={0}
        ref={mainContainerRef}
        // style={{margin: '0 auto'}}
        onKeyDown={(e) => moveSnake(e)}
      >
        <canvas
          className={styles.canvas}
          width={`${CANVAS_SIZE[0]}px`}
          height={`${CANVAS_SIZE[1]}px`}
          ref={canvasRef}
        ></canvas>

        <div className="ml-5 flex w-screen">
          <div className="flex flex-col items-center justify-center w-full ">
            <p className="text-center text-3xl font-bold mb-2">
              Your points are {points}
            </p>
            <div className="mb-2">
              <div>
                <p className="flex items-center text-lg">
                  Use <Image src="/Arrows.svg" width={150} height={100}></Image>
                  to navigate
                </p>
              </div>
            </div>

            <button
              className="bg-cyan-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-max"
              onClick={startGame}
            >
              Start Game
            </button>
          </div>
        
        </div>
        {gameOver && (
            <Backdrop
              sx={{ backgroundColor: "#FFF", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={gameOver}
              style={{backgroundColor:'black',display:'flex', justifyContent: 'center'}}
              //   onClick={handleClose}
            >
              <div className="bg-black text-white w-screen h-screen absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center text-7xl">
                <p>GAME IS OVER!</p>
                <p>Your score is {points}</p>
                <button
                  className="bg-white-500 hover:text-white-700  border border-white font-bold py-2 mt-2 pb-5 px-4 rounded w-max"
                  onClick={startGame}
                >
                  Try again
                </button>
              </div>
            </Backdrop>
          )}
      </div>
    </Gestures>
  );
};

export default SnakeGameComponent;

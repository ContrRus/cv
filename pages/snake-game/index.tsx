import { useState, useRef, useEffect } from "react";
import useInterval from "../../src/useInterval";
import { Directions } from "./types";
import _ from "lodash";
import styles from "./snake-game.module.css";
const SnakeGame = () => {
  const CANVAS_SIZE = [800, 800];
  const SNAKE_START = [
    [8, 7],
    [8, 8],
  ];
  const APPLE_START = [8, 3];
  const SCALE = 40;
  const SPEED = 200;
  const DIRECTIONS: Directions = {
    38: [0, -1], // up
    40: [0, 1], // down
    37: [-1, 0], // left
    39: [1, 0], // right
  };

  const canvasRef = useRef<HTMLCanvasElement>(null);
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

  const startGame = () => {
    setSnake(SNAKE_START);
    setApple(APPLE_START);
    setDir([0, -1]);
    setSpeed(SPEED);
    setGameOver(false);
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
    console.log("piece",piece);
    
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
    <div role="button" tabIndex={0} onKeyDown={(e) => moveSnake(e)}>
      <canvas
        className={styles.canvas}
        width={`${CANVAS_SIZE[0]}px`}
        height={`${CANVAS_SIZE[1]}px`}
        ref={canvasRef}
      ></canvas>
      {gameOver && <div>GAME IS OVER!</div>}
      <button className="bg-cyan-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={startGame}>Start Game</button>
    </div>
  );
};

export default SnakeGame;

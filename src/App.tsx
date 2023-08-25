import React, { useCallback, useEffect, useState } from "react";
import "./App.scss";

function App() {
  const gridSize = 20;
  const cellSize = 30;
  const initialSnake = [{ x: 0, y: 19 }];
  const initialApple = { x: 10, y: 10 };

  const [snake, setSnake] = useState(initialSnake);
  const [apple, setApple] = useState(initialApple);
  const [direction, setDirection] = useState("right");
  const [gameOver, setGameOver] = useState(false);
  const [onGame, setOnGame] = useState(false);
  const [score, setScore] = useState(1);
  const [speed, setSpeed] = useState(300);

  const randomPosition = () => {
    return {
      x: Math.floor(Math.random() * gridSize),
      y: Math.floor(Math.random() * gridSize),
    };
  };

  const startGame = () => {
    setOnGame(true);
  };
  const stopGame = () => {
    setOnGame(false);
  };

  const checkCollision = (segment: any) => {
    return snake.some((part) => part.x === segment.x && part.y === segment.y);
  };

  const handleKeyPress = useCallback(
    (event: any) => {
      if (event.key === "ArrowUp" && direction !== "down") {
        setDirection("up");
      } else if (event.key === "ArrowDown" && direction !== "up") {
        setDirection("down");
      } else if (event.key === "ArrowLeft" && direction !== "right") {
        setDirection("left");
      } else if (event.key === "ArrowRight" && direction !== "left") {
        setDirection("right");
      }
    },
    [direction]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!gameOver && onGame) {
        const newSnake = [...snake];
        const head = { ...newSnake[0] };

        if (direction === "up") {
          if (head.y === 0) {
            head.y = 19;
          } else {
            head.y--;
          }
        }
        if (direction === "down") {
          if (head.y === 19) {
            head.y = 0;
          } else {
            head.y++;
          }
        }

        if (direction === "left") {
          if (head.x === 0) {
            head.x = 19;
          } else {
            head.x--;
          }
        }
        if (direction === "right") {
          if (head.x === 19) {
            head.x = 0;
          } else {
            head.x++;
          }
        }

        newSnake.unshift(head);
        if (head.x === apple.x && head.y === apple.y) {
          setScore(score + 1);
          if (score === 60) setGameOver(true);
          if (score % 5 === 0 && speed !== 50) setSpeed(speed - 25);
          console.log(score);
          setApple(randomPosition());
        } else {
          newSnake.pop();
        }

        if (
          head.x < 0 ||
          head.x >= gridSize ||
          head.y < 0 ||
          head.y >= gridSize ||
          checkCollision(head)
        ) {
          setGameOver(true);
          clearInterval(interval);
          return;
        }

        setSnake(newSnake);
      } else {
        clearInterval(interval);
      }
    }, speed);

    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [snake, apple, direction, gameOver]);

  return (
    <div className="App">
      <div className="MenuPanel">
        {gameOver && <p className="game-over">Game Over</p>}
        <h1 className="Score">Score: {score}</h1>
        <div className="btnSection">
          <button onClick={startGame}>Start Game</button>
          <button onClick={stopGame}>Stop Game</button>
        </div>
      </div>
      <div className="grid">
        {Array.from({ length: gridSize * gridSize }).map((i, index) => {
          const x = index % gridSize;
          const y = Math.floor(index / gridSize);
          const isSnake = snake.some((part) => part.x === x && part.y === y);
          const isApple = apple.x === x && apple.y === y;

          return (
            <div
              key={index}
              className={`cell ${isSnake ? "snake" : ""} ${
                isApple ? "apple" : ""
              }`}
              style={{
                width: cellSize + "px",
                height: cellSize + "px",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;

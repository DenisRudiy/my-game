import React, { useEffect, useState } from "react";
import "./App.scss";
import { Snake } from "./Items/Snake/Snake";
import { Apple } from "./Items/Apple/Apple";

function App() {
  const time = 125;
  const [flag, setFlag] = useState(false);
  const [direction, setDirection] = useState("right");
  const [positionX, setPositionX] = useState(40);
  const [positionY, setPositionY] = useState(600);
  const [posAppleX, setPosAppleX] = useState(
    Math.floor(Math.random() * 30) * 40
  );
  const [posAppleY, setPosAppleY] = useState(
    Math.floor(Math.random() * 30) * 40
  );

  const StartGame = () => {
    setFlag(true);
  };
  const StopGame = () => {
    setFlag(false);
    setPositionX(600);
    setPositionY(600);
  };

  const Move = () => {
    if (direction === "right") {
      if (positionX === 1160) {
        setPositionX(0);
      } else {
        setPositionX(positionX + 40);
      }
    } else if (direction === "left") {
      if (positionX === 0) {
        setPositionX(1160);
      } else {
        setPositionX(positionX - 40);
      }
    } else if (direction === "down") {
      if (positionY === 1160) {
        setPositionY(0);
      } else {
        setPositionY(positionY + 40);
      }
    } else {
      if (positionY === 0) {
        setPositionY(1160);
      } else {
        setPositionY(positionY - 40);
      }
    }
    if (positionX === posAppleX && positionY === posAppleY) {
      setPosAppleX(Math.floor(Math.random() * 30) * 40);
      setPosAppleY(Math.floor(Math.random() * 30) * 40);
      console.log(posAppleX, posAppleY);
    }
  };

  const handleKeyDown = (event: any) => {
    if (flag) {
      if (event.key === "ArrowLeft" && direction !== "right") {
        setDirection("left");
      } else if (event.key === "ArrowRight" && direction !== "left") {
        setDirection("right");
      } else if (event.key === "ArrowUp" && direction !== "down") {
        setDirection("up");
      } else if (event.key === "ArrowDown" && direction !== "up") {
        setDirection("down");
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    const interval = setInterval(() => {
      if (flag) {
        Move();
      }
    }, time);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearInterval(interval);
    };
  });

  return (
    <div className="App">
      <div className="Field">
        <div
          className="SnakePosition"
          style={{ marginLeft: positionX + "px", marginTop: positionY + "px" }}
        >
          <Snake />
        </div>
        <div
          className="ApplePosition"
          style={{ marginLeft: posAppleX + "px", marginTop: posAppleY + "px" }}
        >
          <Apple />
        </div>
      </div>
      <div className="Buttons">
        <button onClick={StartGame}>Start Game</button>
        <button onClick={StopGame}>Try Again</button>
      </div>
    </div>
  );
}

export default App;

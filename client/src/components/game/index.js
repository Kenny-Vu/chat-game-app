import React, { useEffect, useState, useRef } from "react";
import styled, { keyframes } from "styled-components";
import useGameLoop from "../../hooks/useGameLoop"; //Might use later
import useInterval from "../../hooks/useInterval";
const SPEED = 1;

const Game = () => {
  const [left, setLeft] = useState(null);
  const [top, setTop] = useState(null);
  const [keyPress, setKeyPress] = useState({});

  const playerRef = useRef();
  const gameZoneRef = useRef();

  //function checks if one of the control keys for movement has been pressed
  const handleKeyPress = (e) => {
    if (
      e.code === "KeyW" ||
      e.code === "KeyA" ||
      e.code === "KeyD" ||
      e.code === "KeyS"
    ) {
      setKeyPress((prevKeyPress) => ({ [e.key]: true }));
    }
  };
  const handleKeyUp = (e) => {
    if (
      e.code === "KeyW" ||
      e.code === "KeyA" ||
      e.code === "KeyD" ||
      e.code === "KeyS"
    ) {
      setKeyPress((prevKeyPress) => ({ [e.key]: false }));
    }
  };

  useEffect(() => {
    gameZoneRef.current.addEventListener("keydown", handleKeyPress);
    gameZoneRef.current.addEventListener("keyup", handleKeyUp);
    return () => {
      gameZoneRef.current.removeEventListener("keydown", handleKeyPress);
      gameZoneRef.current.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useInterval(() => {
    if (keyPress.a) {
      setLeft((prevLeft) => prevLeft - SPEED);
    }
    if (keyPress.d) {
      setLeft((prevLeft) => prevLeft + SPEED);
    }
    if (keyPress.w) {
      setTop((prevTop) => prevTop - SPEED);
    }
    if (keyPress.s) {
      setTop((prevTop) => prevTop + SPEED);
    }
  });

  return (
    <GameZone ref={gameZoneRef} tabIndex={0}>
      <Sprite ref={playerRef} style={{ left: `${left}px`, top: `${top}px` }} />
    </GameZone>
  );
};

const GameZone = styled.div`
  flex: 2;
  background: url("https://cdn.vox-cdn.com/thumbor/FTGflhW34E25BS2EQcrCVE6U_Sk=/0x0:1920x1080/1200x675/filters:focal(1019x358:1325x664)/cdn.vox-cdn.com/uploads/chorus_image/image/62668832/ss_631d99cc6462cce94081032b7e600a6b87c3f7d3.0.jpg");
  background-size: cover;
  background-repeat: no-repeat;
`;
const Sprite = styled.div`
  position: absolute;
  background: url("assets/pichin.png");
  background-size: 80px 80px;
  height: 80px;
  width: 80px;
`;

export default Game;

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import ReactEmoji from "react-emoji";

import { Sprite } from "../../GlobalStyles";
import useInterval from "../../hooks/useInterval";
import { playerMoves, playerWalks } from "../../actions";
import Bubble from "./Bubble";

const SPEED = 1.5; //player's movement speed
let delta = 0; //time difference used for walking animation

const Controller = ({ socket, user, room, keyPress }) => {
  const { posX, posY, spriteY, spriteX, liked } = useSelector(
    (state) => state.playerStates
  );
  const dispatch = useDispatch();

  //MAIN GAME LOOP
  useInterval(() => {
    if (keyPress.a) {
      if (posX < -544) {
        return;
      }
      delta++;
      if (delta > 60) {
        dispatch(playerWalks());
        delta = 0;
      }
      dispatch(playerMoves({ posX: posX - SPEED, posY, spriteY: -400 }));
      socket.emit("move-player", {
        room,
        posX: posX - SPEED,
        posY,
        spriteY,
        spriteX,
      });
    }
    if (keyPress.d) {
      if (posX > 900) {
        return;
      }
      delta++;
      if (delta > 60) {
        dispatch(playerWalks());
        delta = 0;
      }
      dispatch(playerMoves({ posX: posX + SPEED, posY: posY, spriteY: -144 }));
      socket.emit("move-player", {
        user,
        room,
        posX: posX + SPEED,
        posY,
        spriteY,
        spriteX,
      });
    }
    if (keyPress.w) {
      if (posY < -216) {
        return;
      }
      delta++;
      if (delta > 60) {
        dispatch(playerWalks());
        delta = 0;
      }
      dispatch(playerMoves({ posX, posY: posY - SPEED, spriteY: -272 }));
      socket.emit("move-player", {
        user,
        room,
        posX,
        posY: posY - SPEED,
        spriteY,
        spriteX,
      });
    }
    if (keyPress.s) {
      if (posY > 520) {
        return;
      }
      delta++;
      if (delta > 60) {
        dispatch(playerWalks());
        delta = 0;
      }
      dispatch(playerMoves({ posX, posY: posY + SPEED, spriteY: -16 }));
      socket.emit("move-player", {
        user,
        room,
        posX,
        posY: posY + SPEED,
        spriteY,
        spriteX,
      });
    }
  });

  return (
    <>
      {liked && <Bubble posX={posX} posY={posY} />}
      <Player
        style={{
          left: `${posX + 256 * 2}px`,
          top: `${posY + 144 + 144 / 2}px`,
          backgroundPosition: `${spriteX}px ${spriteY}px`,
          zIndex: 2,
        }} //we have to alter the position of the character to center him in the Camera div
      />
    </>
  );
};

const Player = styled(Sprite)``;

// const Bubble = styled.div`
//   position: absolute;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   padding: 0.5rem;
//   width: 90px;
//   height: 73px;
//   border-radius: 50%;
//   overflow: visible;
//   span {
//     font-size: 2rem;
//   }
//   img {
//     position: absolute;
//     width: 100px;
//     height: 100px;
//     border-radius: 20%;
//   }
// `;

export default Controller;

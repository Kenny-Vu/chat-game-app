import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import ReactEmoji from "react-emoji";

import { Sprite } from "../../GlobalStyles";
import useInterval from "../../hooks/useInterval";
import { playerMoves, playerWalks } from "../../actions";

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
      console.log(keyPress);
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
      {liked && (
        <Bubble
          style={{
            left: `${posX + 256 * 2}px`,
            top: `${posY - 64 + 144 + 144 / 2}px`,
            backgroundPosition: `${spriteX}px ${spriteY}px`,
            zIndex: 3,
          }}
        >
          ❤️
        </Bubble>
      )}

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

const Bubble = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  font-size: 2rem;
`;

export default Controller;

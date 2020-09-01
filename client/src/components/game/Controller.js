import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { Sprite } from "../../GlobalStyles";
import useInterval from "../../hooks/useInterval";
import {
  playerMoves,
  playerWalks,
  playerInteracts,
  playerStopsInteraction,
} from "../../actions";
import Bubble from "./Bubble";

const SPEED = 1.5; //player's movement speed
let delta = 0; //time difference used for walking animation

const Controller = ({ socket, user, room, keyPress, setKeyPress }) => {
  const { posX, posY, spriteY, spriteX, liked, interaction } = useSelector(
    (state) => state.playerStates
  );
  const dispatch = useDispatch();

  //MAIN GAME LOOP
  useInterval(() => {
    //interaction key
    if (keyPress.Space) {
      //if player is in an interactive
      if (posX < -450 && posY < -150) {
        dispatch(playerInteracts());
      }
    }
    if (interaction) {
      delta++;
      if (delta > 1000) {
        dispatch(playerStopsInteraction());
        delta = 0;
      }
    }
    //Mouvement keys
    if (keyPress.KeyA) {
      if (posX < -544) {
        return;
      }
      //collision with undertale sprite right side
      if (posX < -475 && posY < -175) {
        return;
      }
      //collision with bar right side
      if (posX < 580 && posX > -250 && posY < -175) {
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
    if (keyPress.KeyD) {
      if (posX > 900) {
        return;
      }
      //collision with bar left side
      if (posX < 580 && posX > -250 && posY < -175) {
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
    if (keyPress.KeyW) {
      if (posY < -244) {
        return;
      }
      //collision with undertale sprite bottom
      if (posX < -480 && posY < -170) {
        return;
      }
      //collision with bar bottom
      if (posX < 580 && posX > -250 && posY < -175) {
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
    if (keyPress.KeyS) {
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

export default Controller;

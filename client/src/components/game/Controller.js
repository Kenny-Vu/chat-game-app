import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { Sprite } from "../../GlobalStyles";
import useInterval from "../../hooks/useInterval";
import {
  playerMoves,
  playerWalks,
  playerStopsInteraction,
  playerUnLiked,
  playerInteracts,
} from "../../actions";
import Bubble from "./Bubble";

const SPEED = 1.5; //player's movement speed
let delta = 0; //time difference used for walking animation
let likeDelta = 0; //for like message bubble
let interactionDelta = 0;

const Controller = ({
  socket,
  user,
  room,
  keyPress,
  interacting,
  setInteracting,
}) => {
  const { posX, posY, spriteY, spriteX, liked } = useSelector(
    (state) => state.playerStates
  );
  const dispatch = useDispatch();

  //MAIN GAME LOOP
  useInterval(() => {
    //if player activates the like message bubble
    if (liked) {
      socket.emit("player-liked", { liked: true, room });
      likeDelta++;
      if (likeDelta > 700) {
        likeDelta = 0;
        dispatch(playerUnLiked());
        socket.emit("player-unLiked", { liked: false, room });
      }
    }
    //if player is interacting with NPC
    if (interacting) {
      if (posX < -450 && posY < -150) {
        dispatch(playerInteracts());
        interactionDelta++;
        if (interactionDelta > 3000) {
          dispatch(playerStopsInteraction());
          setInteracting(false);
          interactionDelta = 0;
        }
      } else {
        dispatch(playerStopsInteraction());
        setInteracting(false);
      }
    }
    //Mouvement keys
    if (keyPress.KeyA) {
      //collision with left wall || right side of NPC || right side of bar table
      if (
        posX < -544 ||
        (posX < -475 && posY < -175) ||
        (posX < 580 && posX > -100 && posY < -200)
      ) {
        return;
      }
      delta++;
      if (delta > 30) {
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
      //collision with right wall || left side of bar table
      if (posX > 900 || (posX < 400 && posX > -230 && posY < -200)) {
        return;
      }
      delta++;
      if (delta > 30) {
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
      //collision with top wall || Bottom of NPC || bottom of bar table
      if (
        posY < -244 ||
        (posX < -480 && posY < -170) ||
        (posX < 575 && posX > -225 && posY < -190)
      ) {
        return;
      }
      delta++;
      if (delta > 30) {
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
      //collision with bottom wall
      if (posY > 520) {
        return;
      }
      delta++;
      if (delta > 30) {
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

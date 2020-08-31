import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import useInterval from "../../hooks/useInterval";
import {
  playerJoins,
  playerMoves,
  playerWalks,
  updateGameState,
} from "../../actions";
import LogOut from "./LogOut";

//TESSSSTT
import { useKeyPress } from "../../hooks/useKeyPress";

const SPEED = 1.5;
let delta = 0;

const Game = ({ socket, user, room }) => {
  const { keyPress, handleKeyPress, handleKeyUp } = useKeyPress();
  //retrieving current X and Y position of our user's sprite
  const { posX, posY, spriteY, spriteX } = useSelector(
    (state) => state.playerStates
  );
  const { activePlayers } = useSelector((state) => state.gameStates);
  const dispatch = useDispatch();
  const gameZoneRef = useRef();

  useEffect(() => {
    socket.emit("request-existing-players", { room });
    //adds users sprites that are already in room excluding main player
    socket.on("populate-game-zone", ({ players }) => {
      dispatch(updateGameState(players));
      //REDUX - ADDING NEW PLAYERSTATE HERE BECAUSE SOCKET.ID IS AVAILABLE
      dispatch(playerJoins({ id: socket.id, user, room }));
    });
    //main player
    socket.emit("player-joins", {
      user,
      room,
      posX,
      posY,
      spriteY,
      spriteX,
    });
    // friend joins room - add all members except main player
    socket.on("new-player-joins", ({ players }) => {
      delete players[`${socket.id}`];
      const playersArray = Object.values(players);
      dispatch(updateGameState(playersArray));
    });
    //update everyone's position except the main player
    socket.on("update-player-position", ({ players }) => {
      delete players[`${socket.id}`];
      const playersArray = Object.values(players);
      dispatch(updateGameState(playersArray));
    });
  }, []);

  useEffect(() => {
    const gameZone = gameZoneRef.current;

    gameZoneRef.current.addEventListener("keydown", handleKeyPress);
    gameZoneRef.current.addEventListener("keyup", handleKeyUp);
    return () => {
      gameZone.removeEventListener("keydown", handleKeyPress);
      gameZone.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

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
    <GameZone ref={gameZoneRef} tabIndex={0}>
      <Camera>
        <Map
          style={{
            left: `${-posX}px`,
            top: `${-posY}px`,
          }}
        >
          <Sprite
            style={{
              left: `${posX + 256 * 2}px`,
              top: `${posY + 144 + 144 / 2}px`,
              backgroundPosition: `${spriteX}px ${spriteY}px`,
              zIndex: 2,
            }} //we have to alter the position of the character to center him in the Camera div
          />
          {activePlayers &&
            activePlayers.map((player, index) => (
              <Sprite
                key={`friend-${index}`}
                style={{
                  left: `${player.posX + 256 * 2}px`,
                  top: `${player.posY + 144 + 144 / 2}px`,
                  backgroundPosition: `${player.spriteX}px ${player.spriteY}px`,
                  zIndex: 1,
                }} //we have to alter the position of the character to center him in the Camera div
              />
            ))}
        </Map>
      </Camera>
      <ActionBar>
        <LogOut socket={socket}>Logout</LogOut>
      </ActionBar>
    </GameZone>
  );
};

const GameZone = styled.div`
  position: relative;
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: grey;
`;

const Camera = styled.div`
  position: relative;
  height: ${`${144 * 4}px`};
  width: ${`${256 * 4}px`};
  background: lightgray;
  border: solid;
`;

const Map = styled.div`
  position: relative;
  height: ${`${144 * 6}px`};
  width: ${`${256 * 6}px`};
  background: url("assets/map.png");
  background-size: cover;
  background-repeat: no-repeat;
  box-shadow: 0 0 16px black;
  image-rendering: pixelated;
`;
const Sprite = styled.div`
  position: absolute;
  background: url("assets/character.png");
  image-rendering: pixelated;
  background-size: 512px 512px;
  background-repeat: no-repeat;
  height: 128px;
  width: 128px;
  /* border: solid; */
`;
const ActionBar = styled.div`
  width: 80%;
  border: solid;
  margin: 0.5rem;
  padding: 0.5rem;
  background: white;
`;

export default Game;

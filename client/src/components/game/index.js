import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import useInterval from "../../hooks/useInterval";
import { Button } from "../../GlobalStyles";
import { playerJoins, playerMoves, updateGameState } from "../../actions";

const SPEED = 1.5;

const Game = ({ socket, user, room }) => {
  const [keyPress, setKeyPress] = useState({}); // useHook?
  const [spriteY, setSpriteY] = useState(-16);

  //retrieving current X and Y position of our user's sprite
  const { posX, posY } = useSelector((state) => state.playerStates);
  const { activePlayers } = useSelector((state) => state.gameStates);
  const dispatch = useDispatch();
  const history = useHistory();
  const gameZoneRef = useRef();

  useEffect(() => {
    socket.emit("request-existing-players", { room });
    //adds users sprites that are already in room excluding main player
    socket.on("populate-game-zone", ({ players }) => {
      dispatch(updateGameState(players));
      //REDUX - ADDING NEW PLAYERSTATE
      dispatch(playerJoins({ id: socket.id, user, room, posX: 0, posY: 0 }));
    });
    //main player
    socket.emit("player-joins", {
      user,
      room,
      posX: 0,
      posY: 0,
    });
    // friend joins room - add all members except main player
    socket.on("new-player-joins", ({ players }) => {
      delete players[`${socket.id}`];
      const playersArray = Object.values(players);
      dispatch(updateGameState(playersArray));
    });
    //update everyone's position except the main player
    socket.on("update-player-position", ({ players }) => {
      console.log("working...");
      delete players[`${socket.id}`];
      const playersArray = Object.values(players);
      dispatch(updateGameState(playersArray));
    });
  }, []);
  const handleLogOut = () => {
    socket.disconnect();
    socket.close();
    sessionStorage.clear();
    history.push("/");
  };

  //function checks if one of the control keys for movement has been pressed
  const handleKeyPress = (e) => {
    if (
      e.code === "KeyW" ||
      e.code === "KeyA" ||
      e.code === "KeyD" ||
      e.code === "KeyS"
    ) {
      //We don't need to remember the other keys in state. Only the key that is true is needed to move our character
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
      //in this case we do need to remember the state of the other keys. Otherwise, keys that are still true will be removed.Making our character stop
      setKeyPress((prevKeyPress) => ({ ...prevKeyPress, [e.key]: false }));
    }
  };

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
      setSpriteY(-400);
      if (posX < -544) {
        return;
      }
      dispatch(playerMoves({ posX: posX - SPEED, posY }));
      socket.emit("move-player", {
        user,
        room,
        posX: posX - SPEED,
        posY,
      });
    }
    if (keyPress.d) {
      setSpriteY(-144);
      if (posX > 900) {
        return;
      }
      dispatch(playerMoves({ posX: posX + SPEED, posY: posY }));
      socket.emit("move-player", {
        user,
        room,
        posX: posX + SPEED,
        posY,
      });
    }
    if (keyPress.w) {
      setSpriteY(-272);
      if (posY < -216) {
        return;
      }
      dispatch(playerMoves({ posX, posY: posY - SPEED }));
      socket.emit("move-player", {
        user,
        room,
        posX,
        posY: posY - SPEED,
      });
    }
    if (keyPress.s) {
      setSpriteY(-16);
      if (posY > 520) {
        return;
      }
      dispatch(playerMoves({ posX, posY: posY + SPEED }));
      socket.emit("move-player", {
        user,
        room,
        posX,
        posY: posY + SPEED,
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
              backgroundPosition: `-4px ${spriteY}px`,
            }} //we have to alter the position of the character to center him in the Camera div
          />
          {activePlayers &&
            activePlayers.map((player, index) => (
              <Sprite
                key={`friend-${index}`}
                style={{
                  left: `${player.posX + 256 * 2}px`,
                  top: `${player.posY + 144 + 144 / 2}px`,
                }} //we have to alter the position of the character to center him in the Camera div
              />
            ))}
        </Map>
      </Camera>
      <ActionBar>
        <Button onClick={handleLogOut}>Logout</Button>
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
  border: solid;
`;
const ActionBar = styled.div`
  width: 80%;
  border: solid;
  margin: 0.5rem;
  padding: 0.5rem;
  background: white;
`;

export default Game;

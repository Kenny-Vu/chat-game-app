import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import useInterval from "../../hooks/useInterval";
import { Button } from "../../GlobalStyles";
const SPEED = 1.5;

const Game = ({ socket, user, room }) => {
  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);
  const [keyPress, setKeyPress] = useState({});
  const [gameState, setGameState] = useState([]);

  //call useSelector to make playerState available
  // const playerState = useSelector((state) => state.playerState);

  const history = useHistory();

  const playerRef = useRef();
  const gameZoneRef = useRef();
  const mapRef = useRef(); //set, but unsused for now...

  useEffect(() => {
    socket.emit("request-existing-players");
    //adds users sprites that are already in room
    socket.on("populate-game-zone", ({ players }) => {
      const playersArray = Object.values(players);
      setGameState((prevGameState) => playersArray);
      //call dispatch to add player state to reducer with the socket id
    });
    //main player
    socket.emit("player-joins", {
      user,
      room,
      posX: left,
      posY: top,
    });
    // friend joins room
    socket.on("new-player-joins", ({ players }) => {
      delete players[`${socket.id}`];
      console.log(players);
      const playersArray = Object.values(players);
      setGameState((prevGameState) => playersArray);
      console.log(playersArray);
    });
    //update everyone's position except the main player
    socket.on("update-player-position", ({ players }) => {
      console.log("working...");
      delete players[`${socket.id}`];
      const playersArray = Object.values(players);
      setGameState((prevGameState) => playersArray);
      console.log(gameState);
    });
  }, []);

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
  //function
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
      if (left < -544) {
        return;
      }
      setLeft((prevLeft) => prevLeft - SPEED);
      socket.emit("move-player", { user, room, posX: left, posY: top });
    }
    if (keyPress.d) {
      if (left > 900) {
        return;
      }
      setLeft((prevLeft) => prevLeft + SPEED);
      socket.emit("move-player", { user, room, posX: left, posY: top });
    }
    if (keyPress.w) {
      if (top < -216) {
        return;
      }
      setTop((prevTop) => prevTop - SPEED);
      socket.emit("move-player", { user, room, posX: left, posY: top });
    }
    if (keyPress.s) {
      if (top > 520) {
        return;
      }
      setTop((prevTop) => prevTop + SPEED);
      socket.emit("move-player", { user, room, posX: left, posY: top });
    }
  });

  const handleLogOut = () => {
    socket.disconnect();
    socket.close();
    sessionStorage.clear();
    history.push("/");
  };

  return (
    <GameZone ref={gameZoneRef} tabIndex={0}>
      <Camera>
        <Map ref={mapRef} style={{ left: `${-left}px`, top: `${-top}px` }}>
          <Sprite
            ref={playerRef}
            style={{
              left: `${left + 256 * 2}px`,
              top: `${top + 144 + 144 / 2}px`,
            }} //we have to alter the position of the character to center him in the Camera div
          />
          {gameState &&
            gameState.map((player, index) => (
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
  background-position: -4px -16px;
  background-repeat: no-repeat;
  height: 128px;
  width: 128px;
`;
const ActionBar = styled.div`
  width: 80%;
  border: solid;
  margin: 0.5rem;
  padding: 0.5rem;
  background: white;
`;

export default Game;

import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import useInterval from "../../hooks/useInterval";
import { Button } from "../../GlobalStyles";
const SPEED = 0.6;

const Game = ({ socket }) => {
  const [left, setLeft] = useState(null);
  const [top, setTop] = useState(null);
  const [keyPress, setKeyPress] = useState({});

  const history = useHistory();

  const playerRef = useRef();
  const gameZoneRef = useRef();
  const mapRef = useRef(); //set, but unsused for now...

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

  useInterval(() => {
    if (keyPress.a) {
      if (left < -544) {
        return;
      }
      setLeft((prevLeft) => prevLeft - SPEED);
    }
    if (keyPress.d) {
      if (left > 900) {
        return;
      }
      setLeft((prevLeft) => prevLeft + SPEED);
    }
    if (keyPress.w) {
      if (top < -216) {
        return;
      }
      setTop((prevTop) => prevTop - SPEED);
    }
    if (keyPress.s) {
      if (top > 520) {
        return;
      }
      setTop((prevTop) => prevTop + SPEED);
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

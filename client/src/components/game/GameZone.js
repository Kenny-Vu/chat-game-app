import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { useKeyPress } from "../../hooks/useKeyPress";

const GameZone = () => {
  const zoneRef = useRef();
  const { handleKeyPress, handleKeyUp } = useKeyPress();
  useEffect(() => {
    const zone = zoneRef.current;

    zoneRef.current.addEventListener("keydown", handleKeyPress);
    zoneRef.current.addEventListener("keyup", handleKeyUp);
    return () => {
      zone.removeEventListener("keydown", handleKeyPress);
      zone.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return <Zone ref={zoneRef} tabIndex={0} />;
};

const Zone = styled.div`
  position: relative;
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: grey;
`;

export default GameZone;

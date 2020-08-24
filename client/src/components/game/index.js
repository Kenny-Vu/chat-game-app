import React, { useEffect } from "react";
import styled from "styled-components";

const Game = () => {
  const handleKey = (e) => {
    console.log("keydown works");
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <GameZone>
      <Sprite />
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
  background: url("assets/pichin.png");
  background-size: cover;
  height: 80px;
  width: 80px;
`;

export default Game;

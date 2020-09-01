import React from "react";
import styled from "styled-components";

const Npc = () => {
  return (
    <NonPlayable
      style={{
        left: "30px",
        top: "30px",
        backgroundPosition: `-44px 16px`,
      }}
    ></NonPlayable>
  );
};

const NonPlayable = styled.div`
  position: absolute;
  background: url("assets/undertale.png");
  image-rendering: pixelated;
  background-size: 190px 80px;
  background-repeat: no-repeat;
  height: 128px;
  width: 46px;
`;

export default Npc;

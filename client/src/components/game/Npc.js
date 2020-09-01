import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import MsgBubble from "./Bubble";

const Npc = () => {
  const { interaction } = useSelector((state) => state.playerStates);
  return (
    <>
      {interaction && (
        <Bubble
          style={{
            left: "100px",
          }}
        >
          <span>❤️</span>
          <img src="/assets/bubble-tip.svg" />
        </Bubble>
      )}
      <NonPlayable
        style={{
          left: "30px",
          top: "30px",
          backgroundPosition: `-44px 16px`,
        }}
      ></NonPlayable>
    </>
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

const Bubble = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  width: 90px;
  height: 73px;
  border-radius: 50%;
  overflow: visible;
  span {
    font-size: 2rem;
  }
  img {
    position: absolute;
    width: 100px;
    height: 100px;
    border-radius: 20%;
  }
`;

export default Npc;

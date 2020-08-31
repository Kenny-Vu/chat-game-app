import React from "react";
import styled from "styled-components";

const Bubble = ({ posX, posY, friendX, friendY }) => {
  return (
    <MsgBubble
      style={{
        left: `${(posX || friendX) + 256 * 2.4}px`,
        top: `${(posY || friendY) - 32 + 144 + 144 / 2}px`,
        zIndex: 3,
      }}
    >
      <span>❤️</span>
      <img src="/assets/bubble-tip.svg" />
    </MsgBubble>
  );
};

const MsgBubble = styled.div`
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

export default Bubble;

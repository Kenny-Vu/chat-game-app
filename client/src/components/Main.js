import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import Chat from "./chat";
import Game from "./game";

const Main = () => {
  const { user, room } = useSelector((state) => state.chatRooms);
  return (
    <Wrapper>
      <Game />
      {user && <Chat user={user} room={room} />}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
`;
export default Main;

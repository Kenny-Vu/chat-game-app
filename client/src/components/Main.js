import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import Chat from "./chat";
import Game from "./chat";

const Main = () => {
  const { user, room } = useSelector((state) => state.chatRooms);
  return (
    <Wrapper>
      <GameZone>GameZone</GameZone>
      {user && <Chat user={user} room={room} />}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
`;

const GameZone = styled.div`
  flex: 2;
  border: solid;
`;
export default Main;

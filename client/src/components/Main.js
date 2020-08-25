import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import Chat from "./chat";
import Game from "./game";
import Error from "./Error";

const Main = () => {
  //For now we're using data from the session storage rather than redux to know if user only refreshed the browser rather than closed it
  // let { user, room } = useSelector((state) => state.chatRooms);

  return (
    <Wrapper>
      <Game />
      {sessionStorage.getItem("userName") ? (
        <Chat
          user={sessionStorage.getItem("userName")}
          room={sessionStorage.getItem("userRoom")}
        />
      ) : (
        <Error />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
`;
export default Main;

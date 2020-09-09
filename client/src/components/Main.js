import React from "react";
import styled from "styled-components";
import io from "socket.io-client"; //test

import Chat from "./chat";
import Game from "./game";
import Error from "./Error";

const BASE_URL = "https://chat-game-app.herokuapp.com/"; // specify the port of the server

//For now we're using data from the session storage rather than redux to know if user only refreshed the browser rather than closed it
const Main = () => {
  const socket = io(BASE_URL);

  return (
    <Wrapper>
      {sessionStorage.getItem("userName") ? (
        <>
          <Game
            socket={socket}
            user={sessionStorage.getItem("userName")}
            room={sessionStorage.getItem("userRoom")}
          />
          <Chat
            socket={socket}
            user={sessionStorage.getItem("userName")}
            room={sessionStorage.getItem("userRoom")}
          />
        </>
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

import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import { Button } from "../GlobalStyles";
//Need to pass userName and Room info to the Main component.

const Home = () => {
  const [userName, setUserName] = useState("");
  const [userRoom, setUserRoom] = useState("");
  const [error, setError] = useState(null);
  const history = useHistory();

  // If user was already logged in then redirect him to chat/game room
  if (sessionStorage.getItem("userName")) {
    history.push("/main");
  }

  //Function stores room name and user name inside redux
  const createRoom = (e) => {
    e.preventDefault();
    if (!userName || !userRoom) {
      setError("Some information is missing!");
      return;
    }
    // instead we can store the use in session to deal with browser refreshes
    sessionStorage.setItem("userName", userName);
    sessionStorage.setItem("userRoom", userRoom);
    setUserName("");
    setUserRoom("");
    history.push("/main");
  };

  return (
    <Wrapper>
      <h1>Welcome to the Hangout</h1>
      <p>Use the W,A,S,D keys to move once you're in the room</p>
      <form>
        <div>
          <Input
            placeholder="Choose a name"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          ></Input>
        </div>
        <div>
          <Input
            placeholder="Choose a room name"
            value={userRoom}
            onChange={(e) => {
              setUserRoom(e.target.value);
            }}
          ></Input>
        </div>
        <div>
          <Submit
            type="submit"
            onClick={(e) => {
              createRoom(e);
            }}
          >
            Submit
          </Submit>
        </div>
      </form>
      {error && <div>{error}</div>}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: black;
  color: white;
  h1 {
    font-size: 4rem;
    margin-bottom: 2rem;
  }
  form {
    text-align: center;
    box-shadow: 0 0 6px white;
    padding: 0.5rem;
  }
`;

const Input = styled.input`
  padding: 0.5rem;
  margin: 0.5rem;
  width: 300px;
  font-size: 1.25rem;
`;

const Submit = styled(Button)`
  margin: 2rem 0;
  padding: 1rem;
  font-size: 1.25rem;
`;
export default Home;

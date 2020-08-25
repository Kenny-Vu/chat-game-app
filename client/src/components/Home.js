import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { userJoins } from "../actions";

//Need to pass userName and Room info to the Main component.

const Home = () => {
  const [userName, setUserName] = useState("");
  const [userRoom, setUserRoom] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  //Function stores room name and user name inside redux
  const createRoom = (e) => {
    e.preventDefault();
    if (!userName || !userRoom) {
      return; //create a error message later on to let user know they must fill the form
    }
    // dispatch(userJoins({ user: userName, room: userRoom })); do not need redux at the moment
    sessionStorage.setItem("userName", userName); // TEST
    sessionStorage.setItem("userRoom", userRoom); // TEST
    setUserName("");
    setUserRoom("");
    history.push("/main");
    history.goForward();
  };

  return (
    <Wrapper>
      <h1>Homepage</h1>
      <form>
        <div>
          <input
            placeholder="Enter username"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          ></input>
        </div>
        <div>
          <input
            placeholder="Enter room name"
            value={userRoom}
            onChange={(e) => {
              setUserRoom(e.target.value);
            }}
          ></input>
        </div>
        <div>
          <button
            type="submit"
            onClick={(e) => {
              createRoom(e);
            }}
          >
            Submit
          </button>
        </div>
      </form>
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
`;

export default Home;

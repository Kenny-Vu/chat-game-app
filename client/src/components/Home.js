import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

//Need to pass userName and Room info to the Main component.

const Home = () => {
  const [userName, setUserName] = useState("");
  const [userRoom, setUserRoom] = useState("");
  const [error, setError] = useState(null);
  // const dispatch = useDispatch();
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
      return; //create a error message later on to let user know they must fill the form
    }
    // dispatch(userJoins({ user: userName, room: userRoom })); do not need redux at the moment
    // instead we can store the use in session for browser refreshes
    sessionStorage.setItem("userName", userName);
    sessionStorage.setItem("userRoom", userRoom);
    setUserName("");
    setUserRoom("");
    history.push("/main");
  };

  return (
    <Wrapper>
      <h1>Welcome</h1>
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
`;

const Input = styled.input`
  padding: 0.5rem;
  margin: 0.5rem;
`;

const Submit = styled.button`
  margin: 0 auto;
`;

export default Home;

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import io from "socket.io-client";

let socket;
const BASE_URL = "localhost:8000"; // specify the port of the server

const SideChat = () => {
  const [input, setInput] = useState("");
  const [message, setMessage] = useState({ text: null, id: null });
  const [feed, setFeed] = useState([]);

  const userName = "Penpen 🐧"; //for now user is static
  const room = "club Penguin"; // hard coded room for now

  //On mount, user connects to socket.io and sends info of User that just joined to BE
  useEffect(() => {
    socket = io(BASE_URL);

    socket.emit("user-joins", { userName, room });
    socket.on("welcome", ({ text, id }) => {
      setFeed((feed) => [...feed, { text, id }]);
    });
    socket.on("friend-joined", ({ text, id }) => {
      setFeed((feed) => [...feed, { text, id }]);
    });
    console.log(`socket: ${socket}`);
  }, []);

  //client receives user info from backend and adds user welcome message

  useEffect(() => {
    socket.on("display-message", ({ text, id }) => {
      setMessage({ text, id });
      setFeed([...feed, { text, id }]);
    });
    console.log(message);
    console.log(feed);
  }, [feed]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`input: ${input}`);
    socket.emit("input-send", { input, id: socket.id }); //send input to BE
    setInput("");
  };
  return (
    <Window>
      <h2>Conversations</h2>
      <div>
        {feed
          ? feed.map((message) => {
              return <div>{message.text}</div>;
            })
          : null}
      </div>
      <ChatForm>
        <ChatInput
          placeholder="Type something man...."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") handleSubmit(e);
          }}
        />
        <Submit type="submit" onClick={(e) => handleSubmit(e)}>
          Send
        </Submit>
      </ChatForm>
    </Window>
  );
};

const Window = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  right: 0;
  height: 100%;
  width: 40%;
  box-shadow: 0 0 4px grey;
  h2 {
    text-align: center;
    background: #4287f5;
    color: white;
  }
`;
const ChatForm = styled.form`
  display: flex;
  justify-content: center;
  box-shadow: 0 0 4px grey;
`;
const ChatInput = styled.textarea`
  height: 3rem;
  width: 100%;
  resize: none;
  font-size: 1.5rem;
  &&:focus {
    outline: none;
    border: #4287f5 solid;
  }
`;
const Submit = styled.button`
  background: #4287f5;
  color: #fff;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  padding: 0.5rem;
  font-size: 1rem;
`;

export default SideChat;

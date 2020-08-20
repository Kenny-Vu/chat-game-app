import React, { useEffect, useState } from "react";
import styled from "styled-components";
import io from "socket.io-client";

let socket;
const BASE_URL = "localhost:8000";

const SideChat = () => {
  const [input, setInput] = useState("");

  useEffect(() => {
    socket = io(BASE_URL);
    console.log(socket);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(input);
  };

  return (
    <Window>
      <h2>Conversations</h2>
      <ChatForm>
        <ChatInput
          placeholder="Type something man...."
          value={input}
          onChange={(e) => setInput(e.target.value)}
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
  border: solid;
  h2 {
    text-align: center;
  }
`;
const ChatForm = styled.form`
  display: flex;
  justify-content: center;
  border: solid;
`;
const ChatInput = styled.textarea`
  height: 3rem;
  width: 100%;
  resize: none;
  font-size: 1.5rem;
  &&:focus {
    outline: none;
    border: none;
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

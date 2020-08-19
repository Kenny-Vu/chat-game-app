import React, { useEffect } from "react";
import styled from "styled-components";

const SideChat = () => {
  useEffect(() => {
    fetch("/test")
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);

  return (
    <Window>
      <h2>Feed</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
      <p>MAX 250 WORDS OR SOMETHING</p>

      <ChatInput placeholder="Type something man...." />
    </Window>
  );
};

const Window = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  right: 0;
  height: 75%;
  width: 30%;
  border: solid;
`;
const ChatInput = styled.textarea`
  width: 100%;
  resize: none;
  box-shadow: 0 0 2px grey;
`;

export default SideChat;

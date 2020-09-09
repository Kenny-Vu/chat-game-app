import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Button } from "../../GlobalStyles";

import { keyGenerator } from "../../helpers";

import Message from "./Message";
import Spinner from "../Spinner";

const Chat = ({ socket, room, user }) => {
  const [input, setInput] = useState("");
  const [feed, setFeed] = useState([]);
  const messageRef = useRef(null); //ref used for autoscrolling

  const { posX, posY } = useSelector((state) => state.playerStates);

  //On mount, user connects to socket.io and sends info of User that just joined to BE
  useEffect(() => {
    socket.emit("user-joins", { user, room });
    // socket.on("populate-feed", ({ messages }) => {
    //   messages.forEach((message) => {
    //     setFeed((feed) => [
    //       ...feed,
    //       { text: message.text, id: message.id, user: message.user },
    //     ]);
    //   });
    // });
    //user receives welcome mesage
    socket.on("welcome", ({ text, id }) => {
      setFeed((feed) => [...feed, { text, id }]);
    });
    //user is notified that a participanthas joins the room
    socket.on("friend-joined", ({ text, id }) => {
      setFeed((feed) => [...feed, { text, id }]);
    });
    //user is notified when a participant leaves the room
    socket.on("friend-left", ({ text }) => {
      setFeed((feed) => [...feed, { text }]);
    });
    //displays messages of participants
    socket.on("display-message", ({ text, id, user, friendX, friendY }) => {
      //we'll add the participant's message to the feed only if he's near enough
      if (
        friendX < posX + 200 &&
        friendX > posX - 200 &&
        friendY < posY + 200 &&
        friendY > posY - 200
      ) {
        setFeed((feed) => [...feed, { text, id, user }]);
      }
    });
    return () => {
      socket.disconnect();
      socket.close();
    };
  }, []);
  //handles autoscroll
  const scrollToBottom = () => {
    messageRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  //handles autoscroll
  useEffect(() => {
    scrollToBottom();
  }, [feed]);

  //Function to add user's input to chat feed
  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("input-send", { input, id: socket.id }); //send input to BE
    setInput("");
    setFeed((feed) => [...feed, { text: input, id: socket.id, user }]);
  };
  return (
    <Window>
      <h2>{room}</h2>

      <Conversation>
        {feed.length > 0 ? (
          feed.map((message, index) => {
            return (
              <Message
                key={keyGenerator() + index}
                message={message}
                user={user}
              />
            );
            // }
          })
        ) : (
          <Spinner />
        )}
        <div ref={messageRef}></div>
      </Conversation>

      <ChatForm>
        <ChatInput
          placeholder="Type something man...."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") handleSubmit(e);
          }}
        />
        <Button type="submit" onClick={(e) => handleSubmit(e)}>
          Send
        </Button>
      </ChatForm>
    </Window>
  );
};

const Window = styled.div`
  flex: 1, 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  right: 0;
  height: 100%;
  box-shadow: 0 0 4px grey;
  h2 {
    text-align: center;
    background: #4287f5;
    color: white;
  }
`;

const Conversation = styled.div`
  height: 100%;
  overflow-y: scroll;
  scroll-behavior: smooth;
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
  font-size: 1.25rem;
  &&:focus {
    outline: none;
    border: #4287f5 solid;
  }
`;

export default Chat;

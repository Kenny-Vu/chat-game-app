import React from "react";
import styled from "styled-components";
import ReactEmoji from "react-emoji";

const Message = ({ message, user }) => {
  const messageColor = (message, user) => {
    let color = "rgba(128,128,128,0.2)";
    if (message.user) {
      if (message.user === user) {
        color = "#53d769";
      } else color = "#5fc9f8";
    }
    return color;
  };

  return (
    <MessageContainer
      style={{
        textAlign: message.user !== user ? "" : "right",
      }}
    >
      <Author>
        {message.user && message.user !== user && `${message.user}`}
      </Author>
      <Text
        style={{
          background: messageColor(message, user),
        }}
      >
        {ReactEmoji.emojify(message.text)}
      </Text>
    </MessageContainer>
  );
};

export default Message;

const MessageContainer = styled.div``;

const Author = styled.div`
  padding: 0.5rem;
  font-size: 1rem;
  opacity: 0.8;
`;

const Text = styled.span`
  display: inline-block;
  position: relative;
  background: #5fc9f8;
  padding: 0.5rem;
  border-radius: 16px;
  margin: 0 0.5rem;
`;

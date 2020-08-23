import React from "react";
import styled from "styled-components";

const Message = ({ message, user }) => {
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
          background: message.user !== user ? "#5fc9f8" : "#53d769",
        }}
      >
        {message.text}
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

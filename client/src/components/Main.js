import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import SideChat from "./SideChat";

const Main = () => {
  const { user, room } = useSelector((state) => state.chatRooms);
  return <Wrapper>{user && <SideChat user={user} room={room} />}</Wrapper>;
};

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
`;

export default Main;

import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { Button } from "../../GlobalStyles";
import { playerLiked } from "../../actions";

const Like = ({ socket, room }) => {
  const dispatch = useDispatch();

  const handleLike = () => {
    dispatch(playerLiked());
  };

  return <LikeButton onClick={handleLike}>Like</LikeButton>;
};

const LikeButton = styled(Button)`
  background: #dea5a4;
`;

export default Like;

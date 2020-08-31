import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { Button } from "../../GlobalStyles";
import useInterval from "../../hooks/useInterval";
import { playerLiked, playerUnLiked } from "../../actions";

let delta = 0;

const Like = ({ socket, room }) => {
  const [liked, SetLiked] = useState(false);

  const dispatch = useDispatch();

  const handleLike = () => {
    SetLiked(true);
  };

  useInterval(() => {
    if (liked) {
      dispatch(playerLiked());
      socket.emit("player-liked", { liked: true, room });
      delta++;
      if (delta > 750) {
        delta = 0;
        SetLiked(false);
        dispatch(playerUnLiked());
        socket.emit("player-unLiked", { liked: false, room });
      }
    }
  });

  return <LikeButton onClick={handleLike}>Like</LikeButton>;
};

const LikeButton = styled(Button)`
  background: #dea5a4;
`;

export default Like;

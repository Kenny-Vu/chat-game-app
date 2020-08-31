import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { Button } from "../../GlobalStyles";
import useInterval from "../../hooks/useInterval";
import { playerLiked, playerUnLiked } from "../../actions";

let delta = 0;

const Like = () => {
  const [liked, SetLiked] = useState(false);

  const dispatch = useDispatch();

  const handleLike = () => {
    SetLiked(true);
  };

  useInterval(() => {
    if (liked) {
      dispatch(playerLiked());
      delta++;
      if (delta > 2000) {
        delta = 0;
        SetLiked(false);
        dispatch(playerUnLiked());
      }
    }
  });

  return <LikeButton onClick={handleLike}>Like</LikeButton>;
};

const LikeButton = styled(Button)`
  background: #dea5a4;
`;

export default Like;

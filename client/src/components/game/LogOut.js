import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button } from "../../GlobalStyles";

import { playerLeaves } from "../../actions";

const LogOut = ({ socket }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogOut = () => {
    socket.disconnect();
    socket.close();
    sessionStorage.clear();
    dispatch(playerLeaves());
    history.push("/");
  };

  return <Button onClick={handleLogOut}>Log out</Button>;
};

export default LogOut;

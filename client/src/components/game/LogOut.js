import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "../../GlobalStyles";

const LogOut = ({ socket }) => {
  const history = useHistory();
  const handleLogOut = () => {
    socket.disconnect();
    socket.close();
    sessionStorage.clear();
    history.push("/");
  };

  return <Button onClick={handleLogOut}>Log out</Button>;
};

export default LogOut;

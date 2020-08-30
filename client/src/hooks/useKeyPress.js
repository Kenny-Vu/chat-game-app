import React, { useState } from "react";

export const useKeyPress = () => {
  const [keyPress, setKeyPress] = useState({}); // useHook?
  //function checks if one of the control keys for movement has been pressed
  const handleKeyPress = (e) => {
    if (
      e.code === "KeyW" ||
      e.code === "KeyA" ||
      e.code === "KeyD" ||
      e.code === "KeyS"
    ) {
      //We don't need to remember the other keys in state. Only the key that is true is needed to move our character
      setKeyPress((prevKeyPress) => ({ [e.key]: true }));
    }
  };
  const handleKeyUp = (e) => {
    if (
      e.code === "KeyW" ||
      e.code === "KeyA" ||
      e.code === "KeyD" ||
      e.code === "KeyS"
    ) {
      //in this case we do need to remember the state of the other keys. Otherwise, keys that are still true will be removed.Making our character stop
      setKeyPress((prevKeyPress) => ({ ...prevKeyPress, [e.key]: false }));
    }
  };
  return { keyPress, handleKeyPress, handleKeyUp };
};

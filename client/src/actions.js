//ACTIONS FOR MAIN PLAYER
export const playerJoins = ({ id, user, room, posX, posY }) => ({
  type: "PLAYER_JOINS",
  id,
  user,
  room,
  posX,
  posY,
});

export const playerMoves = ({ posX, posY }) => ({
  type: "PLAYER_MOVES",
  posX,
  posY,
});
export const playerLeaves = () => ({ type: "PLAYER_LEAVES" });

//ACTIONS FOR GAMESTATE
export const updateGameState = (players) => {
  console.log(players);
  return {
    type: "UPDATE_GAMESTATE",
    players,
  };
};

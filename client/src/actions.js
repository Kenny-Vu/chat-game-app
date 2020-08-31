//ACTIONS FOR MAIN PLAYER
export const playerJoins = ({ id, user, room }) => ({
  type: "PLAYER_JOINS",
  id,
  user,
  room,
});

export const playerMoves = ({ posX, posY, spriteY }) => ({
  type: "PLAYER_MOVES",
  posX,
  posY,
  spriteY,
});
export const playerWalks = () => ({ type: "PLAYER_WALKS" });
export const playerLeaves = () => ({ type: "PLAYER_LEAVES" });

//ACTIONS FOR GAMESTATE
export const updateGameState = (players) => {
  console.log(players);
  return {
    type: "UPDATE_GAMESTATE",
    players,
  };
};

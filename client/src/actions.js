//ACTIONS FOR MAIN PLAYER
export const playerJoins = ({ id, user, room, posX, posY }) => ({
  type: "PLAYER_JOINS",
  id,
  user,
  room,
  posX,
  posY,
});

export const playerMoves = ({ posX, posY, spriteY }) => ({
  type: "PLAYER_MOVES",
  posX,
  posY,
  spriteY,
});
export const playerWalks = () => ({ type: "PLAYER_WALKS" });

//ACTIONS FOR GAMESTATE
export const updateGameState = (players) => {
  console.log(players);
  return {
    type: "UPDATE_GAMESTATE",
    players,
  };
};

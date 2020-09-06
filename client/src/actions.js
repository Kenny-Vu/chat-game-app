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
export const playerLiked = () => ({ type: "PLAYER_LIKED" });
export const playerUnLiked = () => ({ type: "PLAYER_UNLIKED" });
export const playerInteracts = () => ({ type: "PLAYER_INTERACTS" });
export const playerStopsInteraction = () => ({
  type: "PLAYER_STOPS_INTERACTION",
});
//ACTIONS FOR GAMESTATE
export const updateGameState = (players) => {
  return {
    type: "UPDATE_GAMESTATE",
    players,
  };
};

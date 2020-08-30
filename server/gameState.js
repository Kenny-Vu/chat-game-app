const gameState = {};

//HELPERS FOR GAME SIDE
//adding new players that log in
const addNewPlayer = (id, user, room, posX, posY) => {
  const players = Object.values(gameState);
  const playerExists = players.find((player) => player.user === user);
  //if user already exists we need to give him a new socket id and remove the old entry
  if (playerExists) {
    delete gameState[`${playerExists.id}`];
    console.log("old player deleted!");
  }
  gameState[`${id}`] = {
    id,
    user,
    room,
    posX,
    posY,
  };
};

const updatePlayer = (id, user, room, posX, posY) => {
  gameState[`${id}`] = {
    id,
    user,
    room,
    posX,
    posY,
  };
};

getAllPlayers = () => {
  return gameState;
};

const removePlayer = (id) => {
  delete gameState[`${id}`];
};

module.exports = {
  gameState,
  addNewPlayer,
  updatePlayer,
  removePlayer,
};

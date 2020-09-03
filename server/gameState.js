const gameState = {};

//HELPERS FOR GAME SIDE
//adding new players that log in
const addNewPlayer = (id, user, room, posX, posY, spriteY, spriteX) => {
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
    spriteY,
    spriteX,
  };
};

const updatePlayer = (id, user, room, posX, posY, spriteY, spriteX) => {
  gameState[`${id}`] = {
    id,
    user,
    room,
    posX,
    posY,
    spriteY,
    spriteX,
  };
};

getPlayersInRoom = (room) => {
  // const playerObj = {};
  const playersArr = Object.values(gameState).filter(
    (player) => player.room === room
  );
  // playersArr.forEach((player) => {
  //   playerObj[`${player.id}`] = player;
  // });
  return playersArr;
};

const removePlayer = (id) => {
  delete gameState[`${id}`];
};

module.exports = {
  gameState,
  addNewPlayer,
  updatePlayer,
  getPlayersInRoom,
  removePlayer,
};

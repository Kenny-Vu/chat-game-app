const users = {};
const gameState = {};

//retrieves user using username
const getUserFromName = (userName) => {
  const usersInfos = Object.values(users);
  const userFound = usersInfos.find((user) => user.user === userName);
  return userFound;
};

//add user to list of users
const addUser = (id, user, room) => {
  const usersInfos = Object.values(users);
  const userExists = usersInfos.find((client) => client.user === user);
  //if user already exists we need to give him a new socket id and remove the old entry
  if (userExists) {
    delete users[`${userExists.id}`];
    console.log("old user deleted!");
  }
  console.log("user added!");
  users[`${id}`] = { id, user, room };
  console.log(users);
};
//remove user from users
const removeUser = (id) => {
  console.log("removed user!");
  delete users[`${id}`];
  console.log(users);
};
//get infos from a specific user
const getUser = (id) => {
  return users[`${id}`];
};

//get all users in a certain room
const getUsersInRoom = (room) => {
  const allUsers = Object.values(users);
  return allUsers.filter((user) => user.room === room);
};

//HELPERS FOR GAME SIDE
//adding new players that log in
const addNewPlayer = (id, user, room, posX, posY) => {
  gameState[`${id}`] = {
    id,
    user,
    room,
    posX,
    posY,
  };
  console.log(gameState);
};

const updatePlayer = (id, user, room, posX, posY) => {
  gameState[`${id}`] = {
    id,
    user,
    room,
    posX,
    posY,
  };
  console.log(gameState);
};

getAllPlayers = () => {
  return gameState;
};

module.exports = {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
  getUserFromName,
  addNewPlayer,
  updatePlayer,
  getAllPlayers,
};

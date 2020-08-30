const users = {};

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
  }
  users[`${id}`] = { id, user, room };
};
//remove user from users
const removeUser = (id) => {
  delete users[`${id}`];
};
//get infos for a specific user
const getUser = (id) => {
  return users[`${id}`];
};

//get all users in a certain room
const getUsersInRoom = (room) => {
  const allUsers = Object.values(users);
  return allUsers.filter((user) => user.room === room);
};

module.exports = {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
  getUserFromName,
};

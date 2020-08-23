const users = {};

//add user to list of users
const addUser = (id, user, room) => {
  users[`${id}`] = { id, user, room };
};
//remove user from users
const removeUser = (id) => {
  delete users[`${id}`];
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

module.exports = { addUser, removeUser, getUser, getUsersInRoom };

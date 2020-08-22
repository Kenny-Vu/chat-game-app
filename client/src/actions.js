export const userJoins = ({ user, room }) => ({
  type: "USER_JOINS",
  user,
  room,
});

export const userLeaves = () => ({ type: "USER_LEAVES" });

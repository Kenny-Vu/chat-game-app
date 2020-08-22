const initialState = {
  user: null,
  room: null,
};

const chatRoomReducer = (state = initialState, action) => {
  const { user, room, type } = action;
  switch (type) {
    case "USER_JOINS": {
      return {
        user,
        room,
      };
    }
    case "USER_LEAVES":
      return initialState;
    default:
      return state;
  }
};

export default chatRoomReducer;

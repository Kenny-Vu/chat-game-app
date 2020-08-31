//Reducer I made while doing tests with using sprite movements

const initialState = {
  id: null,
  user: null,
  room: null,
  posX: 0,
  posY: 0,
  spriteY: -4,
};

const playerStateReducer = (state = initialState, action) => {
  const { user, room, posX, posY, spriteY } = action;
  switch (action.type) {
    case "PLAYER_JOINS": {
      return {
        ...state,
        id: action.id,
        user,
        room,
      };
    }
    case "PLAYER_MOVES": {
      return {
        ...state,
        posX,
        posY,
        spriteY,
      };
    }
    case "PLAYER_LEAVES": {
      return initialState;
    }
    default:
      return state;
  }
};

export default playerStateReducer;

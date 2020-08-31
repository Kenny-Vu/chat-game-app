//Reducer I made while doing tests with using sprite movements

const initialState = {
  id: null,
  user: null,
  room: null,
  posX: 0,
  posY: 0,
  spriteY: -16,
  spriteX: -4,
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
    case "PLAYER_WALKS": {
      const walkPos = state.spriteX > -388 ? state.spriteX - 128 : -4;
      return {
        ...state,
        spriteX: walkPos,
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

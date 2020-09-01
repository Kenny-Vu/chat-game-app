//Reducer I made while doing tests with using sprite movements

const initialState = {
  id: null,
  user: null,
  room: null,
  posX: 0,
  posY: 0,
  spriteY: -16,
  spriteX: -4,
  liked: null,
  interaction: false,
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
      const lastSpritePosition = -388;
      const walkPos =
        state.spriteX > lastSpritePosition ? state.spriteX - 128 : -4;
      return {
        ...state,
        spriteX: walkPos,
      };
    }
    case "PLAYER_LIKED": {
      return {
        ...state,
        liked: true,
      };
    }
    case "PLAYER_UNLIKED": {
      return {
        ...state,
        liked: null,
      };
    }
    case "PLAYER_INTERACTS": {
      return {
        ...state,
        interaction: true,
      };
    }
    case "PLAYER_STOPS_INTERACTION": {
      return {
        ...state,
        interaction: false,
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

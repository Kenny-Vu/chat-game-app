const initialState = {
  activePlayers: null,
};

const gameStateReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_GAMESTATE": {
      return {
        activePlayers: action.players,
      };
    }
    default:
      return state;
  }
};

//helpers
//helper to change object to array
export const convertToArray = (state) => {
  return Object.values(state.gameStates.activePlayers);
};

export default gameStateReducer;

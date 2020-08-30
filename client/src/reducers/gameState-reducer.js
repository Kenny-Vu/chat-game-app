const initialState = {
  activePlayers: null,
};

const gameStateReducer = (state = initialState, action) => {
  console.log(action);
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

export default gameStateReducer;

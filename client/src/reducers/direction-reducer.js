//Reducer I made while doing tests with using sprite movements

const initialState = {
  start: 1,
  end: 3,
};

const directionReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case "MOVE_DOWN": {
      return initialState;
    }
    case "MOVE_LEFT": {
      return { start: 4, end: 6 };
    }
    case "MOVE_RIGHT": {
      return { start: 7, end: 9 };
    }
    case "MOVE_UP": {
      return { start: 10, end: 12 };
    }
    default:
      return state;
  }
};

export default directionReducer;

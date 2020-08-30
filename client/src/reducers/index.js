import { combineReducers } from "redux";
import playerStates from "./playerState-reducer";
import gameStates from "./gameState-reducer";
// import chatRooms from "./chatRoom-reducer";

export default combineReducers({ playerStates, gameStates });

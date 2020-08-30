import { combineReducers } from "redux";
import playerState from "./player-reducer";
import chatRooms from "./chatRoom-reducer";

export default combineReducers({ playerState, chatRooms });

import { combineReducers } from "redux";
import directions from "./direction-reducer";
import chatRooms from "./chatRoom-reducer";

export default combineReducers({ directions, chatRooms });

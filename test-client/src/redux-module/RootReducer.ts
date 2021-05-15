import { combineReducers } from "redux";
import user  from './user';
import screen_size from "./screen_size";

const rootReducer = combineReducers({
    user,
    screen_size
});

export default rootReducer;
export type RootState= ReturnType <typeof rootReducer>
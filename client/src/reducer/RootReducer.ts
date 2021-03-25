import { combineReducers } from "redux";
import ToggleReducer from "./nav_side/Reducer";

const rootReducer = combineReducers({
    ToggleReducer
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>
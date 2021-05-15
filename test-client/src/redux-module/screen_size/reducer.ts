import { RESIZE } from "./action";
import { InitialScreenSize, ScreenSizeAction, ScreenSizeState } from "./types";

//4. reducer 작성
export default function screenReducer(state : ScreenSizeState = InitialScreenSize, action : ScreenSizeAction) {
    switch(action.type){
        case RESIZE:
            return {
                ...state,
                width : action.screenWidth,
                height : action.screenHeight
            }
        default:
            return state;
    }
}
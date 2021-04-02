import { LOGIN_USER } from "./actions";
import { initialUserState, UserAction, UserState } from "./types";

function UserReducer(state: UserState = initialUserState, action: UserAction){
    switch(action.type){
        case LOGIN_USER:
            return {
                ...state,
                login : action.payload
            };
        default:
            return state;
    }
}

export default UserReducer;
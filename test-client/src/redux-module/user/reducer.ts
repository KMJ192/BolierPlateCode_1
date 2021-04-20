import { GET_USER_PROFILE, GET_USER_PROFILE_SUCCESS, GET_USER_PROFILE_ERROR } from "./action";
import { UserState } from './types';
import { InitialUserProfile, UserAction } from "./types";

//4. reducer 작성
export default function userReducer(state : UserState = InitialUserProfile, action: UserAction){
    switch(action.type){
        case GET_USER_PROFILE:
            return{
                ...state,
                userProfile : {
                    loading: true,
                    error : null,
                    data : null
                }
            };
        case GET_USER_PROFILE_SUCCESS:
            return{
                ...state,
                userProfile : {
                    loading: false,
                    error : null,
                    data : action.payload
                }
            }
        case GET_USER_PROFILE_ERROR:
            return {
                ...state,
                userProfile : {
                    loading: false,
                    error : action.payload,
                    data : null
                }
            }
        default:
            return state;
    }
}
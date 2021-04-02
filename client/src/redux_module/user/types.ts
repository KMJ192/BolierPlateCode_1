import * as actions from './actions';
import { ActionType } from 'typesafe-actions';

export interface UserProfile{
    useremail : string;
    nickname : string;
    userimage : string;
    result : string;
    message : string;
}

export type UserAction = ActionType<typeof actions>;
export type UserState = {
    userProfile : {
        loading: boolean;
        error : Error | null,
        data : UserProfile | null
    }
}
export const InitialUserState = {
    userProfile : {
        loading : false,
        error : null,
        data : null
    }
}
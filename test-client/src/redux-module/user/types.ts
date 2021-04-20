import { getUserProfile } from "./action";
import { ActionType } from "typesafe-actions";

export interface UserProfile{
    useremail : string;
    nickname : string;
    user_image : string;
    result: boolean;
    message: string;
}

//2. action type 생성
export type UserAction = ActionType<typeof getUserProfile>;
export type UserState = {
    userProfile : {
        loading: boolean;
        error : Error | null;
        data : UserProfile | null;
    }
};
//3. intialize
export const InitialUserProfile = {
    userProfile : {
        loading: false,
        error : null,
        data : null
    }
};
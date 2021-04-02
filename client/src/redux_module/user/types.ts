import { loginUser } from "./actions";

export type UserAction = 
    ReturnType<typeof loginUser>

export interface UserState{
    email : string;
    nickname : string;
    user_image : string;
}
export const initialUserState: UserState = {
    email : "",
    nickname : "",
    user_image : ""
}
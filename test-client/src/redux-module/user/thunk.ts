import axios from "axios";
import { Dispatch } from "redux";
import { getUserProfile } from "./action";
import { UserProfile } from "./types";

//redux thunk 작성
export function getUserThunk() {
    return async (dispatch : Dispatch) => {
        const { request, success, failure } = getUserProfile;
        dispatch(request());
        try{
            const userProfile = await requestUserProfile();
            dispatch(success(userProfile));
        }catch(e){
            dispatch(failure(e));
        }
    }    
}

async function requestUserProfile() {
    return await axios.get<UserProfile>("/user")
        .then(response => response.data)
        .catch(err => err);
}
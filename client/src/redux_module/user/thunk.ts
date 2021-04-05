import axios from "axios";
import { Dispatch } from "redux";
import { getUserProfileAsync } from "./actions";
import { UserProfile } from "./types";

export function getUserThunk() {
    return async (dispatch : Dispatch) => {
        const { request, success, failure } = getUserProfileAsync;
        dispatch(request());
        try{
            const userProfile = await getUser();
            dispatch(success(userProfile));
        }catch(e){
            dispatch(failure(e));
        }
    }
}

async function getUser() {
    const response = await axios.get<UserProfile>('/user')
        .then(response => response.data)
        .catch(err => err);
    return response;
}
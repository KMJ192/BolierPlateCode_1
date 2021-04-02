import axios from "axios";

export const REGISTER_USER = "REGISTER_USER";       //User Register action
export const PATCH_USER = "PATCH_USER";                  //User Patch actino
export const LOGIN_USER = "LOGIN_USER";                  //Login action
export const LOGOUT_USER = "LOGOUT_USER";            //Logout action
export const AUTH_USER = "AUTH_USER";                    //User Auth action
export const GET_USER = "GET_USER";                        //User Info search

export const loginUser= (dataToSubmit : Object) => {
    const request = axios.post("/login", dataToSubmit)
        .then(response => response.data)
        .catch(err => err);

    return {
        type : LOGIN_USER,
        payload : request
    }
}

import axios from "axios";

//액션 정의
export const LOGIN_USER = 'LOGIN_USER' as const;
export const GET_USER = 'GET_USER' as const;
export const AUTH_USER = 'AUTH_USER' as const;

interface LoginData{
    email : string;
    password : string;
}

export const loginUser = ({email, password} : LoginData) => {
    const body = {
        email: email,
        password: password
    }
    const request = axios.post('/login', body);
    return {
        type : LOGIN_USER,
        payload: request
    };
}

interface UserState{
    email : string;
    password : string;
    nickname : string;
    user_image : string;
}
const userInitialState : UserState = {
    email: "",
    password : "",
    nickname : "",
    user_image : ""
};

type UserAction = ReturnType<typeof loginUser>

function userReducer(state: UserState = userInitialState, action : UserAction){
    switch(action.type){
        case LOGIN_USER:
            return {
                ...state,
                email: state.email,
                password : state.password
            }
        default:
            return state;
    }
}
export default userReducer;
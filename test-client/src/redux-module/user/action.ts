import { AxiosError } from "axios";
import { createAsyncAction } from "typesafe-actions";
import { UserProfile } from './types';

//1. action 정의
export const GET_USER_PROFILE = "GET_USER_PROFILE";                 //loading
export const GET_USER_PROFILE_SUCCESS = "GET_USER_PROFILE_SUCCESS"; //success
export const GET_USER_PROFILE_ERROR = "GET_USER_PROFILE_ERROR";     //error

export const getUserProfile = createAsyncAction(
    GET_USER_PROFILE,
    GET_USER_PROFILE_SUCCESS,
    GET_USER_PROFILE_ERROR
)<undefined, UserProfile, AxiosError>();

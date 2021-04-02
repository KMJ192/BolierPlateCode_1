import { createAsyncAction } from 'typesafe-actions';
import { UserProfile } from './types';
import { AxiosError } from 'axios';

export const GET_USER_PROFILE = "GET_USER_PROFILE";
export const GET_USER_PROFILE_SUCCESS = "GET_USER_PROFILE_SUCCESS";
export const GET_USER_PROFILE_ERROR = "GET_USER_PROFILE_ERROR";

export const getUserProfileAsync = createAsyncAction(
    GET_USER_PROFILE,
    GET_USER_PROFILE_SUCCESS,
    GET_USER_PROFILE_ERROR
)<undefined, UserProfile, AxiosError>();
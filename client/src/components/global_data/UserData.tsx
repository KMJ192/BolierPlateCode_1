import React, { createContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux_module/RootReducer';
import { getUserThunk } from '../../redux_module/user';

export const UserContext = createContext({
    email : "",
    nickname : "",
    user_image : ""
});

function UserData() {
    const { data, loading, error } =  useSelector((state : RootState) => state.user.userProfile);
    const [userData, setUserData] = useState({
        email : "",
        nickname : "",
        user_image : ""
    });

    const userDispatch = useDispatch();
    useEffect(() => {
        userDispatch(getUserThunk());
    }, []);

    return (
        <div></div>
    );
}

export default UserData

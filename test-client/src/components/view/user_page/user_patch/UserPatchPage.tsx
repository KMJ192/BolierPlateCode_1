import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux-module/RootReducer';
import Wrapper from '../../../wrapper/Wrapper'
import UserPage from '../UserPage'

function UserPatchPage() {
    const UserData = useSelector((state : RootState) => state.user.userProfile);
    console.log(UserData);

    return (
        <Wrapper>
            <UserPage/>
        </Wrapper>
    );
}

export default UserPatchPage

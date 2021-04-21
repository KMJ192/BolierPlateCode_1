import axios from 'axios';
import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux-module/RootReducer';
import Wrapper from '../../../wrapper/Wrapper'
import UserPage from '../UserPage'

function UserPatchPage() {
    const UserData = useSelector((state : RootState) => state.user.userProfile);
    console.log(UserData);
    document.title=UserData.data?.nickname + "님 정보 수정";

    const request = async () => {
        const response = await axios.post("/patch_user")
    }

    return (
        <Wrapper>
            <UserPage/>
        </Wrapper>
    );
}

export default UserPatchPage

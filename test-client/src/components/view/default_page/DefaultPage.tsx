import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getUserThunk } from '../../../redux-module/user';
import Wrapper from '../../wrapper/Wrapper'

function DefaultPage() {
    const getUserDispatch = useDispatch();
    useEffect(() => {
        getUserDispatch(getUserThunk());
    }, []);

    return (
        <Wrapper>
            <div>
                기본 렌딩 페이지
            </div>
        </Wrapper>
    )
}

export default DefaultPage

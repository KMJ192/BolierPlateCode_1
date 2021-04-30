import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { user_image_path } from '../../../../path/ImagePath';
import { server_url } from '../../../../path/Url';
import { RootState } from '../../../../redux-module/RootReducer';
import Wrapper from '../../../wrapper/Wrapper';
import UserPatchEmailBox from './input_box/UserPatchEmailBox';
import UserPatchNicknameBox from './input_box/UserPatchNicknameBox';
import UserPatchPasswordContainer from './input_box/UserPatchPasswordContainer';

let formData : FormData = new FormData();
function UserPatchPage() {
    const UserData = useSelector((state : RootState) => state.user.userProfile);
    document.title=UserData.data?.nickname + "님 정보 수정";

    const [redirect, setRedirect] = useState(false);
    const [userimgBase64, setUserimgBase64] = useState(user_image_path);
    const[userData, setUserData] = useState({
        nickname : ["", true],
        password : ["", true]
    });

    const fileChangeHandler = (e : React.ChangeEvent<HTMLInputElement>) => {
        const reader : FileReader = new FileReader();
        reader.onloadend = () => {
            if(reader.result){
                setUserimgBase64(String(reader.result));
            }
        }
        if(e.target.files){
            reader.readAsDataURL(e.target.files[0]);
            formData.set("user_image", e.target.files[0]);
        }
    }
    const imgRemoveHandler = () => {
        setUserimgBase64(user_image_path);
        formData.delete("user_image");
    }

    const getNickname = useCallback((data : string, re : boolean) => {
        console.log(re);
        setUserData({
            ...userData,
            nickname : [data, re]
        });
    }, [userData]);

    const getPassword = useCallback((data : string, re : boolean) => {
        if(userData.password[0] !== data || userData.password[1] !== re){
            setUserData({
                ...userData, 
                password : [data, re]
            });
        }
    }, [userData]); 

    useEffect(() => {
        if(UserData.data?.user_image){
            setUserimgBase64(server_url + "/uimg/" + String(UserData.data?.user_image));
        }
    }, [userData, UserData.data?.user_image]);
    const submit = (e : React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        console.log("nickname : " + userData.nickname);
        console.log("password : " + userData.password);
        //setRedirect(true);
    }

    if(redirect){
        return <Redirect to="/"/>;
    }

    return (
        <Wrapper>
            <form onSubmit={submit} className="user-info-form">
                <div className="user-image-container">
                    <div className="user-img-des">프로필 이미지</div>
                    <img className="user-image" onClick={imgRemoveHandler} src={userimgBase64} alt="대표이미지"/>
                    <label htmlFor="user-img-input">
                        프로필 이미지 설정
                    </label>
                    <input id="user-img-input" type="file" onChange={fileChangeHandler} hidden></input>
                    <span>대표 이미지를 수정해보세요.</span>
                </div>
                <div className="user-info-container">
                    <div className="user-data-des">[{UserData.data?.nickname}]님 회원 정보</div>
                    <UserPatchEmailBox
                        useremail={String(UserData.data?.useremail)}
                    />
                    <UserPatchNicknameBox 
                        nowNickname={String(UserData.data?.nickname)}
                        returnNickname={getNickname}
                    />
                    <UserPatchPasswordContainer
                        returnPassword={getPassword}
                    />
                    {UserData.loading ? 
                        <div/>
                    : 
                        <div className="btn-container">
                            <button type="submit">수정하기</button>
                            <a href="/"><button type="button">돌아가기</button></a>
                        </div>
                    }
                </div>
            </form>
        </Wrapper>
    );
}

export default UserPatchPage;

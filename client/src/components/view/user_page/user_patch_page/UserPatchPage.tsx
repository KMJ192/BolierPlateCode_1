import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { UserImage } from '../../../../image/Images';
import { server_url } from '../../../../info_manage/server_url';
import { RootState } from '../../../../redux_module/RootReducer';
import Wrapper from '../../wrapper/Wrapper'
import { 
    Header, 
    UserPatchContainer,
    Form,
    UserImagePlace,
    UserImageLabel,
    UserEmail,
    UserNickname,
    ConfirmDupButton,
    InputPassword,
    UserPatchButton
 } from './UserPatchPageStyle';

const formData : FormData = new FormData();
function UserPatchPage() {
    const { data } = useSelector((state : RootState) => state.user.userProfile);
    const [userimgBase64, setUserimgBase64] = useState("");
    const [imageSetting, setImageSetting] = useState(false);
    const [userData, setUserData] = useState({
        useremail: "",
        nickname: "",
        password: "",
        password_confirm: ""
    });
    const [changeFlag, setChangeFlag] = useState(false);
    const [redirect, setRedirect] = useState(false);
    //=================user image 설정====================
    const fileChangeHandler = (e : React.ChangeEvent<HTMLInputElement>) => {
        const reader : FileReader = new FileReader();
        reader.onload = () => {
            if(reader.result){
                setUserimgBase64(String(reader.result));
            }
        }
        if(e.target.files){
            reader.readAsDataURL(e.target.files[0]);
            formData.set("user_image", e.target.files[0]);
        }
    };
    const imgRemoveHandler = () => {
        setUserimgBase64("");
        formData.delete("user_image");
    }
    if(data?.userimage && !userimgBase64 && !imageSetting){
        setUserimgBase64(server_url + "/uimg/" + data?.userimage);
        setImageSetting(true);
    }
    //=================user image 설정====================

    const submit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(userData.nickname === "" && userData.password === "" && userData.password_confirm === ""){
            setChangeFlag(false);
        }
        if(imageSetting === true){
            setChangeFlag(true);
        }
        if(!changeFlag){
            alert("변경 내용이 없습니다.");
            return;
        }

    }
    
    if(redirect == true){
        return <Redirect to="/"/>
    }

    return (
        <Wrapper>
            <Header>
                {data?.nickname}님 유저정보 수정
            </Header>
            <UserPatchContainer>
                <Form onSubmit={submit}>
                    <div>대표사진설정</div>
                    {userimgBase64? 
                        <UserImagePlace src={userimgBase64} onClick={imgRemoveHandler}/>
                    :
                        <UserImagePlace src={UserImage}/>
                    }
                    <br/>
                    <UserImageLabel htmlFor="userimage-button">
                        내PC에서찾기
                    </UserImageLabel>
                    <br/>
                    <input id="userimage-button" type="file" onChange={fileChangeHandler} hidden />
                    <br/>
                    <UserEmail placeholder={data?.useremail} readOnly/>
                    <br/>
                    <UserNickname placeholder={data?.nickname}></UserNickname>
                    <label><ConfirmDupButton type="button">중복확인</ConfirmDupButton></label>
                    <InputPassword type="password" placeholder="비밀번호 변경"
                        onChange={(e : React.ChangeEvent<HTMLInputElement>) => setUserData({...userData, password: e.target.value})}
                    ></InputPassword>
                    <InputPassword type="password" placeholder="비밀번호 변경 확인"
                        onChange={(e : React.ChangeEvent<HTMLInputElement>) => setUserData({...userData, password_confirm: e.target.value})}
                    ></InputPassword>
                    <br/>
                    <UserPatchButton type="submit">정보수정</UserPatchButton>
                    <br/>
                    <UserPatchButton>회원 탈퇴</UserPatchButton>
                </Form>
            </UserPatchContainer>
        </Wrapper>
    )
}

export default UserPatchPage

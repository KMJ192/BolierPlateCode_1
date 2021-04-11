import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { ConfirmUserForm } from '../../../../function_module/UserForm';
import { UserImage } from '../../../../image/Images';
import { server_url } from '../../../../info_manage/server_url';
import { RootState } from '../../../../redux_module/RootReducer';
import Wrapper from '../../wrapper/Wrapper';
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
    const [nicknameCheck, setNicknameCheck] = useState({
        tmpNickname : "",
        duplication : false
    });
    const [redirect, setRedirect] = useState(false);
    if(userData.useremail === "" && data?.useremail){
        setUserData({
            ...userData,
            useremail : data.useremail
        });
    }
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
    if(data?.userimage && userimgBase64 === "" && !imageSetting){
        setUserimgBase64(server_url + "/uimg/" + data?.userimage);
        //imageSetting을 true로 만들어주어서 reRendering방지
        setImageSetting(true); 
    }
    //=================user image 설정====================

    const confirmNickname = async () => {
        if(userData.nickname === "") {
            alert("별명을 입력해주세요.");
            return;
        }
        await axios.post('/nickname_confirm', {
            nickname: userData.nickname
        }).then(response => {
            if(response.data["result"] === 0){
                alert("사용 가능한 별명입니다.");
                setNicknameCheck({
                    tmpNickname : userData.nickname,
                    duplication : true
                });
            }else if(response.data["result"] === 1){
                alert("중복된 별명입니다.");
            }else{
                alert("알 수 없는 오류");
            }
        }).catch(err => {
            alert("오류가 발생했습니다. 다시 시도해주세요. 오류내용 : " + err);
        });
    }
    //중복 체크 했는데 다시 바뀔 경우 중복 확인 해제
    if(userData.nickname !== nicknameCheck.tmpNickname && nicknameCheck.duplication === true){
        setNicknameCheck({
            ...nicknameCheck,
            duplication : false
        });
    }

    const submit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //변경 여부 확인
        if(userData.nickname === "" && 
            userData.password === "" && 
            userData.password_confirm === "" &&
            server_url + "/uimg/" + data?.userimage === userimgBase64
            ){
            alert("변경된 내용이 없습니다.");
            return;
        }
        //별명 중복체크 유무 확인
        if(nicknameCheck.duplication === false && 
            userData.nickname !== "" && 
            userData.nickname !== data?.nickname
            ){
            alert("별명 중복확인해주세요.");
            return;
        }
        //비밀번호 양식 확인
        if(ConfirmUserForm(userData.password, 1) === false && userData.password !== ""){
            alert("비밀번호 양식은 8~25자리 숫자,영문자 혼합입니다.");
            return;
        }
        //비밀번호 확인
        if(userData.password !== userData.password_confirm){
            alert("비밀번호와 비밀번호 확인이 다릅니다. 확인해주세요");
            return;
        }
        //수정된 유저정보 서버로 request
        formData.set("email", userData.useremail);
        formData.set("nickname", userData.nickname);
        formData.set("password", userData.password);
        await axios.patch("/patch_user", formData)
            .then((response) => {
                if(response.data.patch === true){
                    alert("정보 수정을 완료했습니다.");
                    setRedirect(true);
                }
            }).catch((err) => {
                alert("오류가 발생했습니다. 오류내용 : " + err);
            })
    }

    const deleteUser = async () => {
        await axios.delete("/delete_user/" + userData.useremail, {
            data : userData.useremail
        }).catch((err) => {
            alert("오류가 발생했습니다. 오류내용 : " + err);
            return;
        });
        setRedirect(true);
        alert("탈퇴 완료");
    }
    
    if(redirect === true){
        return <Redirect to="/"/>;
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
                    <UserNickname placeholder={data?.nickname}
                        onChange={(e : React.ChangeEvent<HTMLInputElement>) => setUserData({...userData, nickname : e.target.value})}
                    ></UserNickname>
                    <label>
                        <ConfirmDupButton type="button"
                            onClick={confirmNickname}
                        >중복확인</ConfirmDupButton>
                    </label>
                    <InputPassword type="password" placeholder="비밀번호 변경"
                        onChange={(e : React.ChangeEvent<HTMLInputElement>) => setUserData({...userData, password: e.target.value})}
                    ></InputPassword>
                    <InputPassword type="password" placeholder="비밀번호 변경 확인"
                        onChange={(e : React.ChangeEvent<HTMLInputElement>) => setUserData({...userData, password_confirm: e.target.value})}
                    ></InputPassword>
                    <br/>
                    <UserPatchButton type="submit">정보수정</UserPatchButton>
                    <br/>
                    <UserPatchButton type="button" onClick={deleteUser}>회원 탈퇴</UserPatchButton>
                </Form>
            </UserPatchContainer>
        </Wrapper>
    )
}

export default UserPatchPage
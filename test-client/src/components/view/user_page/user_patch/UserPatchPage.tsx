import axios from 'axios';
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
    const [changeFlag, setChangeFlag] = useState({
        nickname : false,
        password : false,
        user_image : false
    });
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
            setChangeFlag({...changeFlag, user_image : true});
        }
    }
    
    const imgRemoveHandler = () => {
        setChangeFlag({...changeFlag, user_image : true});
        setUserimgBase64(user_image_path);
        formData.delete("user_image");
    }

    const getNickname = useCallback((data : string, re : boolean) => {
        if(userData.nickname[0] !== data || userData.nickname[1] !== re){
            setUserData({
                ...userData,
                nickname : [data, re]
            });
            if(!data) setChangeFlag({...changeFlag, nickname : false});
            else setChangeFlag({...changeFlag, nickname : true});
        }
    }, [userData, changeFlag]);

    const getPassword = useCallback((data : string, re : boolean) => {
        if(userData.password[0] !== data || userData.password[1] !== re){
            setUserData({
                ...userData, 
                password : [data, re]
            });
            if(!data) setChangeFlag({...changeFlag, password : false});
            else setChangeFlag({...changeFlag, password : true});
        }
    }, [userData, changeFlag]); 

    useEffect(() => {
        if(UserData.data?.user_image){
            setUserimgBase64(server_url + "/uimg/" + String(UserData.data?.user_image));
        }
    }, [userData, UserData.data?.user_image]);

    const submit = async (e : React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        if(changeFlag){
            if(UserData.loading === true){
                alert("로딩중입니다.");
                return;
            }
            if(Object(UserData.data?.message)["name"] === "TokenExpiredError"){
                alert("로그아웃되었습니다.")
                setRedirect(true);
                return;
            }
    
            if(userData.nickname[1] === false) alert("별명을 확인해주세요.");
            else if(userData.password[1] === false) alert("비밀번호를 확인해주세요.");
            else if(!changeFlag.user_image && !changeFlag.nickname && !changeFlag.password)
                alert("수정된 내용이 없습니다.");
            else{
                formData.set("email", String(UserData.data?.useremail));
                formData.set("nickname", String(userData.nickname[0]));
                formData.set("password", String(userData.password[0]));

                const request = await axios.patch("/patch_user", formData)
                    .then(response => response.data)
                    .catch(err => err)

                if(request.patch === true){
                    let result : string = "";
                    if(changeFlag.user_image) result = "[대표사진]";
                    if(changeFlag.nickname) result = result + "[별명]";
                    if(changeFlag.password) result = result + "[비밀번호]";
                    result = result + "정보 수정을 완료하였습니다.";
                    alert(result);
                    setRedirect(true);
                }else alert("오류가 발생했습니다. (" + request + ")");
            }
        }else {
            if(Object(UserData.data?.message)["name"] === "TokenExpiredError"){
                alert("로그아웃되었습니다.")
                setRedirect(true);
                return;
            }
            alert("변경된 내용이 없습니다.");
        }

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
                            <button className="btn" type="submit">수정하기</button>
                            <a href="/"><button className="btn" type="button">돌아가기</button></a>
                        </div>
                    }
                </div>
            </form>
        </Wrapper>
    );
}

export default UserPatchPage;

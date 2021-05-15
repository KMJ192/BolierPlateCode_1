import React, { useCallback, useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import { user_image_path } from '../../../../path/ImagePath';
import { login_page } from '../../../../path/PagePath';
import Wrapper from '../../../wrapper/Wrapper';
import EmailBox from './input_box/EmailBox';
import NicknameBox from './input_box/NicknameBox';
import PasswordContainer from './input_box/PasswordContainer';
import '../UserPage.scss';

let formData : FormData = new FormData();
function UserRegisterPage() {
    document.title="회원가입";
    const [redirect, setRedirect] = useState(false);
    const [userimgBase64, setUserimgBase64] = useState(user_image_path);
    const [userData, setUserData] = useState({
        email : ["", false],
        nickname : ["", false],
        password : ["", false]
    });

    //이미지 미리보기
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
    };
    //이미지 삭제
    const imgRemoveHandler = () => {
        setUserimgBase64(user_image_path);
        formData.delete("user_image");
    }

    const getEmail = useCallback((data : string, re : boolean) => {
        setUserData({ ...userData, email : [data, re] });
    },[userData]);

    const getNickname = useCallback((data : string, re : boolean) => {
        setUserData({ ...userData, nickname : [data, re] });
    }, [userData]);
    
    const getPassword = useCallback((data : string, re : boolean) => {
        if(userData.password[0] !== data || userData.password[1] !== re){
            setUserData({ ...userData, password : [data, re] });
        }
    }, [userData]);

    const submit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!userData.email[1]) alert("이메일을 확인해주세요.");
        else if(!userData.nickname[1]) alert("별명을 확인해주세요.");
        else if(!userData.password[1]) alert("비밀번호를 확인해주세요.");
        else{
            formData.set("email", String(userData.email[0]));
            formData.set("nickname", String(userData.nickname[0]));
            formData.set("password", String(userData.password[0]));
            formData.set("user_rol", "0");
            formData.set("created_by", String(userData.nickname[0]));
            formData.set("updated_by", String(userData.nickname[0]));
            const response = await axios.post("/register_user", formData)
                .then(response => response.data)
                .catch(err => err);
    
            if(response["result"]){
                setRedirect(true);
                alert("가입이 완료되었습니다");
                return;
            }
            if(response["User rol error"]) alert("잘못된 유저 role 입니다.");
            else alert("알 수 없는 오류가 발생했습니다.");
        }
    }

    if(redirect){
        return <Redirect to={login_page}/>;
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
                    <input id="user-img-input" type="file" accept="image/*" onChange={fileChangeHandler} hidden></input>
                    <span>대표 이미지를 추가하세요.</span>
                </div>
                <div className="user-info-container">
                    <div className="user-data-des">가입정보</div>
                    <EmailBox
                        returnEmail={getEmail}
                    />
                    <NicknameBox 
                        returnNickname={getNickname}
                    />
                    <PasswordContainer
                        returnPassword={getPassword}
                    />
                    <div className="btn-container">
                        <button className="btn" type="submit">가입하기</button>
                        <a href={login_page}><button className="btn" type="button">로그인 하기</button></a>
                        <a href="/"><button className="btn" type="button">돌아가기</button></a>
                    </div>
                </div>
            </form>
        </Wrapper>
    );
}


export default React.memo(UserRegisterPage);

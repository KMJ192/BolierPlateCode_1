import React, { useState } from 'react';
import EmailBox from './input_box/EmailBox';
import NicknameBox from './input_box/NicknameBox';
import PasswordContainer from './input_box/PasswordContainer';
import { login_page } from '../../../path/PagePath';
import { user_image_path } from '../../../path/ImagePath';
import './UserPage.scss';

interface Props{
    pageName : string;
    formTitle : string;
    email : string;
    userNickname:string
    buttonValue : string;
    requestFunction : (formData : FormData) => void
}

const formData = new FormData();
function UserPage({
        pageName,
        formTitle,
        email,
        userNickname,
        buttonValue,
        requestFunction
    } : Props
) {
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
    const imgRemoveHandler = () => {
        setUserimgBase64(user_image_path);
        formData.delete("user_image");
    }

    const getEmail = (data : string, re : boolean) => {
        setUserData({ ...userData, email : [data, re] });
    }
    const getNickname = (data : string, re : boolean) => {
        setUserData({ ...userData, nickname : [data, re] });
    }
    const getPassword = (data : string, re : boolean) => {
        setUserData({ ...userData, password : [data, re] });
    }   

    const submit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(pageName === "UserRegister"){
            //회원 가입 페이지인 경우
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
            }
        }else{
            //회원 수정 페이진 경우
            console.log(userData);
            if(email) formData.set("email", email);
            else{
                alert("로딩 중 입니다. 잠시 뒤 다시 시도해주세요.");
                return;
            }
            //수정된 내용이 있는데 중복확인 안한경우
            if(userData.nickname[0] && !userData.nickname[1]) {
                alert("별명을 확인해주세요");
            }
            //수정된 내용이 있는데 비밀번호 폼이 안맞는 경우
            else if(userData.nickname[0] && !userData.password[1]) alert("비밀번호를 확인해주세요.");
            else{

            }
        }
        requestFunction(formData);
    }
    
    return (
        <form onSubmit={submit} className="user-info-form">
            <div className="user-image-container">
                <div className="user-img-des">프로필 이미지</div>
                <img className="user-image" onClick={imgRemoveHandler} src={userimgBase64} alt="대표이미지"/>
                <label htmlFor="user-img-input">
                    프로필 이미지 설정
                </label>
                <input id="user-img-input" type="file" onChange={fileChangeHandler} hidden></input>
                <span>대표 이미지를 추가하세요.</span>
            </div>
            <div className="user-info-container">
                <div className="user-data-des">{formTitle}</div>
                {pageName==="UserRegister" ?
                    <EmailBox 
                        placeholder={email}
                        returnEmail={getEmail}
                    />
                    :
                    <div className="email-container">
                        <label htmlFor="email-box">이메일</label>
                        <input 
                            id="email-box"
                            className="user-patch"
                            placeholder={email}
                            readOnly
                        />
                    </div>
                }
                <NicknameBox 
                    pageName={pageName}
                    placeholder={userNickname}
                    returnNickname={getNickname}
                />
                <PasswordContainer
                    pageName={pageName}
                    returnPassword={getPassword}
                />
                <div className="btn-container">
                    <button type="submit">{buttonValue}</button>
                    {pageName==="UserRegister" && 
                        <a href={login_page}><button type="button">로그인 하기</button></a>
                    }
                    <a href="/"><button type="button">돌아가기</button></a>
                </div>
            </div>
        </form>
    );
}


export default UserPage;

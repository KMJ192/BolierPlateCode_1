import React, { useEffect, useState } from 'react';
import { ResultMsg } from '../UserPageStyle';

interface Props{
    pageName : string;
    returnPassword : (data : string, success : boolean) => void;
}

//비밀번호 폼 추출
export function ConfirmPasswordForm(asValue: string) {
    let regExp: RegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,25}$/;
    return regExp.test(asValue);
}

//1. 회원 가입 페이지인 경우
//2. 유저 정보 수정페이지인 경우
//null인 경우 warntext 제거
function PasswordBox({ pageName, returnPassword }: Props) {
    //password, password_confirm save
    const [onfocus, setOnfocus] = useState(false);
    const [password, setPassword] = useState("");
    const [dataCheck, setDatacheck] = useState(false);
    const [warn, setWarn] = useState("");
    const focus = () =>{
        setOnfocus(true);
    }
    //password inputbox blur
    const blur = () =>{
        if(pageName==="UserRegister"){
            if(!password){
                setDatacheck(false);
                setWarn("🙁 비밀번호를 입력해주세요.");
                return;
            }
            if(ConfirmPasswordForm(password) === false){
                setDatacheck(false);
                setWarn("🙁 비밀번호양식은 8~25자리 숫자, 영문자 혼합입니다.");
                return;
            }
        }

        setDatacheck(true);
        if(pageName==="UserRegister") setWarn("🙂 비밀번호 입력 완료 되었습니다.");
        else{
            if(password && ConfirmPasswordForm(password) === false){
                setDatacheck(false);
                setWarn("🙁 비밀번호양식은 8~25자리 숫자, 영문자 혼합입니다.");
            }
        }
    }

    useEffect(() => {
        if(pageName==="UserRegister"){
            if(onfocus){
                if(!ConfirmPasswordForm(password)){
                    setDatacheck(false);
                    setWarn("🙁 비밀번호양식은 8~25자리 숫자, 영문자 혼합입니다.");
                    returnPassword(password, false);
                }else{
                    setDatacheck(true);
                    setWarn("🙂 비밀번호 입력 완료 되었습니다.");
                    returnPassword(password, true);
                }
            }
        }else{
            if(password){
                if(ConfirmPasswordForm(password) === false){
                    setDatacheck(false);
                    setWarn("🙁 비밀번호양식은 8~25자리 숫자, 영문자 혼합입니다.");
                    returnPassword(password, false);
                    return;
                }else{
                    setDatacheck(true);
                    setWarn("🙂 비밀번호 입력 완료 되었습니다.");
                    returnPassword(password, true);
                }
            }else{
                setWarn("");
                returnPassword("", true);
            }
        }
    }, [password]);

    return (
        <div>
            <div className="password-container">
                <label htmlFor="password-box">비밀번호</label>
                <br/>
                <input
                    onFocus={focus}
                    onBlur={blur}
                    id="password-box"
                    type="password"
                    placeholder="비밀번호 입력"
                    onChange={(e : React.ChangeEvent<HTMLInputElement>) => 
                        setPassword(e.target.value)
                    }
                />
                <ResultMsg 
                    className="warn-message"
                    font={dataCheck} {...dataCheck}   
                >{warn}</ResultMsg>
            </div>
        </div>
    );
}
export default PasswordBox;
import React, { useState } from 'react';
import { ResultMsg } from '../UserRegisterStyle';

interface Props{
    containerCName : string;
    title : string;
    id : string
    placeholder : string;
    inputType : string;
    returnPassword : (data:string) => void;
}

//이메일 폼, 비밀번호 폼 추출
export function ConfirmPasswordForm(asValue: string) {
    let regExp: RegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,25}$/;
    return regExp.test(asValue); // 형식에 맞는 경우 true 리턴
}

function PasswordBox({ returnPassword, containerCName, title, id, placeholder, inputType}: Props) {
    const [password, setPassword] = useState("");
    const [dataCheck, setDatacheck] = useState(false);
    const [warn, setWarn] = useState("");

    const blur = () =>{
        if(!password){
            setWarn("🙁 비밀번호를 입력해주세요.");
            return;
        }
        if(ConfirmPasswordForm(password) === false){
            setWarn("🙁 비밀번호양식은 8~25자리 숫자, 영문자 혼합입니다.");
            return;
        }
        setWarn("🙂 비밀번호 입력 완료 되었습니다.");
        setDatacheck(true);
    }

    if(password){
        returnPassword(password);
    }

    return (
        <div className={containerCName}>
            <label htmlFor={id}>{title}</label>
            <br/>
            <input 
                onBlur={blur}
                id={id}
                type={inputType} 
                placeholder={placeholder}
                onChange={
                    (e : React.ChangeEvent<HTMLInputElement>) => 
                    setPassword(e.target.value)
                }
            />
            <ResultMsg 
                className="warn-message"
                font={dataCheck} {...dataCheck}   
            >{warn}</ResultMsg>
        </div>
    );
}

export default PasswordBox;

import React, { useState } from 'react';
import { ResultMsg } from '../UserRegisterStyle';

interface Props{
    containerCName : string;
    title : string;
    id : string
    placeholder : string;
    inputType : string;
    password : string
}

function PasswordConfirmBox({ password, containerCName, title, id, placeholder, inputType}: Props) {
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [sameCheck, setSameCheck] = useState(false);
    const [warn, setWarn] = useState("");
    const blur = () => {
        if(password !== passwordConfirm){
            setSameCheck(false);
            setWarn("🙁 비밀번호와 비밀번호 확인이 일치하지 않습니다.");
            return;
        }
        if(password === ""){
            setSameCheck(false);
            setWarn("🙁 비밀번호를 아직 입력하지 않았습니다.");
        }
        setSameCheck(true);
        setWarn("🙂 비밀번호와 비밀번호 확인이 일치합니다.");
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
                    setPasswordConfirm(e.target.value)
                }
            />
            <ResultMsg 
                className="warn-message"
                font={sameCheck} {...sameCheck}   
            >{warn}</ResultMsg>
        </div>
    );
}

export default PasswordConfirmBox;

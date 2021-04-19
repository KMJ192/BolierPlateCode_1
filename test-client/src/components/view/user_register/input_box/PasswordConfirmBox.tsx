import React, { useState } from 'react';
import { ResultMsg } from '../UserRegisterStyle';

interface Props{
    containerCName : string;
    title : string;
    id : string
    placeholder : string;
    inputType : string;
    compare : boolean;
    returnPasswordConfirm: (data:string, re:boolean) => void;
}

function PasswordConfirmBox({ returnPasswordConfirm, containerCName, title, id, placeholder, inputType, compare}: Props) {
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [sameCheck, setSameCheck] = useState(false);
    const [warn, setWarn] = useState("");
    const blur = () => {
        if(compare === true){
            setSameCheck(true);
            returnPasswordConfirm(passwordConfirm, true);
            setWarn("🙂 비밀번호와 비밀번호 확인이 일치합니다.");
        }else{
            setSameCheck(false);
            returnPasswordConfirm("", false);
            setWarn("🙂 비밀번호와 비밀번호 확인이 일치하지 않습니다.");
        }
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

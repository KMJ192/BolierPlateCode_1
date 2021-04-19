import React, { useEffect, useState } from 'react';
import { ResultMsg } from '../UserRegisterStyle';

interface Props{
    compareData : string;
    returnPasswordConfirm: (passwordConfirm : string) => void;
}

function PasswordConfirmBox({ returnPasswordConfirm, compareData}: Props) {
    const [onFocus, setOnFocus] = useState(false);
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [dataCheck, setDatacheck] = useState(false);
    const [warn, setWarn] = useState("");
    
    const focus = () => {
        setOnFocus(true);
    }
    useEffect(() => {
        if(onFocus){
            if(passwordConfirm !== compareData){
                setDatacheck(false);
                setWarn("🙁 비밀번호와 비밀번호 확인이 다릅니다.");
                return;
            }
            if(compareData){
                setDatacheck(true);
                setWarn("🙂 비밀번호 확인 입력 완료 되었습니다.");
                returnPasswordConfirm(passwordConfirm);
            }
        }
    }, [passwordConfirm]);
    

    return (
        <div className="password-container">
            <label htmlFor="password-confirm-box">비밀번호 확인</label>
            <br/>
            <input
                onFocus={focus}
                id="password-confirm-box"
                type="password"
                placeholder="비밀번호 확인"
                onChange={
                    (e : React.ChangeEvent<HTMLInputElement>) => 
                    setPasswordConfirm(e.target.value)
                }
            />
            <ResultMsg 
                className="warn-message"
                font={dataCheck} {...dataCheck}   
            >{warn}</ResultMsg>
        </div>
    );
}

export default PasswordConfirmBox;

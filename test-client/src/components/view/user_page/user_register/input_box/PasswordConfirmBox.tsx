import React, { useEffect, useState } from 'react';
import { ResultMsg } from '../../UserPageStyle';

interface Props{
    compareData : string;
    passwordConfirmData : (success : boolean) => void
}

function PasswordConfirmBox({ compareData, passwordConfirmData }: Props) {
    const [onfocus, setOnfocus] = useState(false);
    const [dataCheck, setDatacheck] = useState(false);
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [warn, setWarn] = useState("");
    const focus = () => {
        setOnfocus(true);
    }
    
    useEffect(() => {
        if(onfocus){
            if(passwordConfirm !== compareData){
                setDatacheck(false);
                setWarn("🙁 비밀번호와 비밀번호 확인이 다릅니다.");
                passwordConfirmData(false);
            }
            if(compareData && compareData === passwordConfirm){
                setDatacheck(true);
                setWarn("🙂 비밀번호 확인 입력 완료 되었습니다.");
                passwordConfirmData(true);
            }
            if(!passwordConfirm){
                setDatacheck(false);
                setWarn("🙁 비밀번호 확인을 입력해주세요.");
                passwordConfirmData(false);
            }
        }
    }, [compareData, passwordConfirm, onfocus, passwordConfirmData]);

    return (
        <div className="password-container">
            <label htmlFor="password-confirm-box">비밀번호 확인</label>
            <br/>
            <input
                onFocus={focus}
                id="password-confirm-box"
                className="input-box"
                type="password"
                placeholder="비밀번호 확인"
                onChange={(e : React.ChangeEvent<HTMLInputElement>) =>
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

export default React.memo(PasswordConfirmBox);
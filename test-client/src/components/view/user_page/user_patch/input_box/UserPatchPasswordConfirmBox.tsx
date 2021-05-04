import React, { useEffect, useState } from 'react';
import { ResultMsg } from '../../UserPageStyle';

interface Props{
    compareData : string;
    passwordConfirmData : (success : boolean) => void
}

function UserPatchPasswordConfirmBox({ compareData, passwordConfirmData }: Props) {
    const [dataCheck, setDatacheck] = useState(true);
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [warn, setWarn] = useState("");
    
    useEffect(() => {
        if(compareData){
            if(!passwordConfirm){
                setDatacheck(false);
                setWarn("🙁 비밀번호 확인을 입력해주세요.");
                passwordConfirmData(false);
            }else if(compareData !== passwordConfirm){
                setDatacheck(false);
                setWarn("🙁 비밀번호와 비밀번호 확인이 다릅니다.");
                passwordConfirmData(false);
            }else{
                setDatacheck(true);
                setWarn("🙂 비밀번호 확인 입력 완료 되었습니다.");
                passwordConfirmData(true);
            }
        }else{
            if(passwordConfirm){
                setDatacheck(false);
                setWarn("🙁 비밀번호와 비밀번호 확인이 다릅니다.");
                passwordConfirmData(false);
            }else if(!passwordConfirm){
                setDatacheck(true);
                setWarn("");
                passwordConfirmData(true);
            }
        }
    }, [compareData, passwordConfirm, passwordConfirmData]);

    return (
        <div className="password-container">
            <label htmlFor="password-confirm-box">비밀번호 확인</label>
            <br/>
            <input
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

export default React.memo(UserPatchPasswordConfirmBox);
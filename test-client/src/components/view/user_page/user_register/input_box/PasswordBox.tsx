import React, { useEffect, useState } from 'react';
import { ResultMsg } from '../../UserPageStyle';

interface Props{
    passwordData : (data : string, success : boolean) => void;
}

//비밀번호 폼 추출
export function ConfirmPasswordForm(asValue: string) {
    let regExp: RegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,25}$/;
    return regExp.test(asValue);
}

function PasswordBox({ passwordData }: Props) {
    const [onfocus, setOnfocus] = useState(false);
    const [password, setPassword] = useState("");
    const [dataCheck, setDatacheck] = useState(false);
    const [warn, setWarn] = useState("");
    
    const focus = () => {
        setOnfocus(true);
    }
    
    const blur = () =>{
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
        setDatacheck(true);
        setWarn("🙂 비밀번호 입력 완료 되었습니다.");
    }
    
    useEffect(() => {
        if(onfocus){
            if(!ConfirmPasswordForm(password)){
                setDatacheck(false);
                setWarn("🙁 비밀번호양식은 8~25자리 숫자, 영문자 혼합입니다.");                
                passwordData(password, false);
            }else{
                setDatacheck(true);
                setWarn("🙂 비밀번호 입력 완료 되었습니다.");
                passwordData(password, true);
            }
        }
    }, [password, onfocus, dataCheck, passwordData]);
    
    return (
        <div>
            <div className="password-container">
                <label htmlFor="password-box">비밀번호</label>
                <br/>
                <input
                    onFocus={focus}
                    onBlur={blur}
                    id="password-box"
                    className="input-box"
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

export default React.memo(PasswordBox);
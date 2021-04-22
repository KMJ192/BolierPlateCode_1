import React, { useEffect, useState } from 'react';
import { ResultMsg } from '../UserPageStyle';

interface Props{
    pageName : string;
    compareData : string;
    returnSuccess : (success : boolean) => void
}

function PasswordConfirmBox({ pageName, compareData, returnSuccess }: Props) {
    const [onfocus, setOnfocus] = useState(false);
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [dataCheck, setDatacheck] = useState(false);
    const [warn, setWarn] = useState("");

    const focus = () => {
        setOnfocus(true);
    }
    // const blur = () => {
    //     if(pageName==="UserRegister"){
    //         if(!passwordConfirm){
    //             setDatacheck(false);
    //             returnSuccess(false);
    //             setWarn("🙁 비밀번호 확인을 입력해주세요.");
    //         }
    //     }else{
    //         if(compareData && !passwordConfirm){
    //             setDatacheck(false);
    //             returnSuccess(false)
    //             setWarn("🙁 비밀번호와 비밀번호 확인이 다릅니다.");
    //             return;
    //         }
    //         if(!compareData && !passwordConfirm){
    //             returnSuccess(true);
    //             setWarn("");
    //         }
    //     }
    // }

    useEffect(() => {
        if(onfocus){
            if(pageName==="UserRegister"){
                if(passwordConfirm !== compareData){
                    setDatacheck(false);
                    returnSuccess(false);
                    setWarn("🙁 비밀번호와 비밀번호 확인이 다릅니다.");
                }
                if(compareData && compareData === passwordConfirm){
                    setDatacheck(true);
                    returnSuccess(true);
                    setWarn("🙂 비밀번호 확인 입력 완료 되었습니다.");
                }
            }else{
                if(compareData && !passwordConfirm){
                    setDatacheck(false);
                    returnSuccess(false);
                    setWarn("🙁 비밀번호 확인을 입력해주세요.");
                }else if(compareData && passwordConfirm !== compareData){
                    setDatacheck(false);
                    returnSuccess(false)
                    setWarn("🙁 비밀번호와 비밀번호 확인이 다릅니다.");
                }else if(compareData && passwordConfirm === compareData){
                    setDatacheck(true);
                    returnSuccess(true);
                    setWarn("🙂 비밀번호 확인 입력 완료 되었습니다.");
                }else if(!compareData && passwordConfirm){
                    setDatacheck(false);
                    returnSuccess(false)
                    setWarn("🙁 비밀번호와 비밀번호 확인이 다릅니다.");
                }
                else{
                    returnSuccess(true);
                    setWarn("");
                }
            }
        }
    }, [compareData, passwordConfirm]);
    

    return (
        <div className="password-container">
            <label htmlFor="password-confirm-box">비밀번호 확인</label>
            <br/>
            <input
                //onBlur={blur}
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

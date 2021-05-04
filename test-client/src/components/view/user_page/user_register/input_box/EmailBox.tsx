import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ResultMsg } from '../../UserPageStyle';

interface Props{
    returnEmail: (data : string, re : boolean) => void;
}

//이메일 폼 추출
export function ConfirmEmailForm(asValue: string) {
    let regExp: RegExp = /^[0-9a-zA-Z]([-_]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    return regExp.test(asValue);
}

function EmailBox({ returnEmail }: Props) {
    const [email, setEmail] = useState("");
    const [afterDupCheck, setAfterDupCheck] = useState("");
    const [dupCheck, setDupCheck] = useState(false);
    const [warn, setWarn] = useState("");

    //=====blur 처리=====
    const blur = () => {
        if(!email){
            setWarn("🙁 이메일을 입력해주세요.");
            returnEmail("", false);
            return;
        }
        if(ConfirmEmailForm(email) === false){
            setWarn("🙁 이메일 양식으로 입력해주세요.");
            returnEmail("", false);
            return;
        }
        if(dupCheck === false){
            setWarn("🙁 중복 확인해주세요.");
            returnEmail("", false);
            return;
        }
    }
    //=====blur 처리=====
    //=====중복 확인=====
    const checkDuplicateEmail = async () => {
        if(!email){
            setWarn("🙁 이메일을 입력해주세요");
            returnEmail("", false);
            alert("이메일을 입력해주세요")
            return;
        }
        if(ConfirmEmailForm(email) === false){
            setWarn("🙁 이메일 양식으로 입력해주세요.");
            returnEmail("", false);
            alert("이메일 양식으로 입력해주세요")
            return;
        }

        const response = await axios.post("/email_confirm", {email : email})
            .then(res => res.data)
            .catch(err => err);
        if(response.result === "1"){
            setWarn("🙁 중복된 이메일입니다.");
            returnEmail("", false);
            return;
        }else if(response.result === "0"){
            setWarn("🙂 사용할 수 있는 이메일 입니다.");
            setDupCheck(true);
            setAfterDupCheck(email);
            returnEmail(email, true);
        }else{
            returnEmail("", false);
            alert("오류가 발생했습니다. " + response);
        }
    }
    //=====중복 확인=====

    useEffect(() => {
        //=====중복 확인 후 이메일 변경여부 판단=====
        if(afterDupCheck && afterDupCheck !== email && dupCheck === true){
            //중복 확인 했는데 데이터 변화를 감지하면 초기화 
            setAfterDupCheck("");
            setDupCheck(false);
            setWarn("🙁 중복 확인해주세요.");
            returnEmail("", false);
        }
        //=====중복 확인 후 이메일 변경여부 판단=====
    }, [email, afterDupCheck, warn, dupCheck, returnEmail]);

    return (
        <div className="email-container">
            <label htmlFor="email-box">이메일</label>
            <br/>
            <input 
                onBlur={blur}
                id="email-box"
                className="input-box user-register"
                type="text"
                placeholder="이메일 입력"
                onChange={(e : React.ChangeEvent<HTMLInputElement>) => 
                    setEmail(e.target.value)
                }
            />
            <button 
                className="user-page-btn duplicate-confirm" 
                type="button" 
                onClick={checkDuplicateEmail}
                >중복확인</button>
            <ResultMsg font={dupCheck} {...dupCheck}
                className="warn-message"
            >{warn}</ResultMsg>
        </div>
    )
}

export default React.memo(EmailBox);

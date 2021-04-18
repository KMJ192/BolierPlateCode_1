import React, { useRef, useState } from 'react'
import axios from 'axios';
import { ResultMsg } from '../UserRegisterStyle'

interface Props{
    containerCName : string;
    title : string;
    id : string
    placeholder : string;
    inputType : string;
    returnEmail: (data:string) => void;
}

//이메일 폼 추출
export function ConfirmEmailForm(asValue: string) {
    let regExp: RegExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    return regExp.test(asValue);
}

function EmailBox({ returnEmail, containerCName, title, id, placeholder, inputType}: Props) {
    const [email, setEmail] = useState("");
    const [afterDupCheck, setAfterDupCheck] = useState("");
    const [dupCheck, setDupCheck] = useState(false);
    const [warn, setWarn] = useState("");

    //=====blur 처리=====
    const blur = () => {
        if(!email){
            setWarn("🙁 이메일을 입력해주세요.");
            return;
        }
        if(ConfirmEmailForm(email) === false){
            setWarn("🙁 이메일 양식으로 입력해주세요.");
            return;
        }
    }
    //=====blur 처리=====

    //=====중복 확인=====
    const checkDuplicateEmail = async () => {
        if(!email){
            setWarn("🙁 이메일을 입력해주세요");
            return;
        }
        if(ConfirmEmailForm(email) === false){
            setWarn("🙁 이메일 양식으로 입력해주세요.");
            return;
        }

        const response = await axios.post("/email_confirm", {email : email})
            .then(res => res.data)
            .catch(err => err);
        if(response.result === "1"){
            setWarn("🙁 중복된 이메일입니다.");
            return;
        }
        setWarn("🙂 사용할 수 있는 이메일 입니다.");
        setDupCheck(true);
        setAfterDupCheck(email);
    }
    //=====중복 확인=====

    //=====중복 확인 후 이메일 변경여부 판단=====
    if(afterDupCheck && afterDupCheck !== email && dupCheck === true){
        //중복 확인 했는데 데이터 변화를 감지하면 초기화 
        setAfterDupCheck("");
        setDupCheck(false);
        setWarn("🙁 중복 확인해주세요.");
    }
    //=====중복 확인 후 이메일 변경여부 판단=====

    if(dupCheck === true){
        returnEmail(email);
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
                    setEmail(e.target.value)
                }
            />
            <button 
                className="duplicate-confirm" 
                type="button" 
                onClick={checkDuplicateEmail}
                >중복확인</button>
            <ResultMsg font={dupCheck} {...dupCheck}
                className="warn-message"
            >{warn}</ResultMsg>
        </div>
    )
}

export default EmailBox

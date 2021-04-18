import axios from 'axios';
import React, { useState } from 'react'
import { ResultMsg } from '../UserRegisterStyle'

interface Props{
    containerCName : string;
    title : string;
    id : string
    placeholder : string;
    inputType : string;
    returnNickname: (data:string) => void;
}

function NicknameBox({ returnNickname, containerCName, title, id, placeholder, inputType}: Props) {
    const [nickname, setNickname] = useState("");
    const [afterDupCheck, setAfterDupCheck] = useState("");
    const [dupCheck, setDupCheck] = useState(false);
    const [warn, setWarn] = useState("");

    //=====blur 처리=====
    const blur = () => {
        if(!nickname){
            setWarn("🙁 닉네임을 입력해주세요.");
            return;
        }
    }
    //=====blur 처리=====

    //=====중복 확인=====
    const checkDuplicateNickName = async () => {
        if(!nickname){
            setWarn("🙁 닉네임을 입력해주세요.");
            return;
        }

        const response = await axios.post("/nickname_confirm", {nickname : nickname})
            .then(res => res.data)
            .catch(err => err);
        if(response.result === "1"){
            setWarn("🙁 중복된 닉네임 입니다.");
            return;
        }
        setWarn("🙂 사용할 수 있는 닉네임 입니다.");
        setDupCheck(true);
        setAfterDupCheck(nickname);
    }
    //=====중복 확인=====

    //=====중복 확인 후 닉네임 변경여부 판단=====
    if(afterDupCheck && afterDupCheck !== nickname && dupCheck === true){
        //중복 확인 했는데 데이터 변화를 감지하면 초기화 
        setAfterDupCheck("");
        setDupCheck(false);
        setWarn("🙁 중복 확인해주세요.");
    }
    //=====중복 확인 후 이메일 변경여부 판단=====

    if(dupCheck === true){
        returnNickname(nickname);
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
                    setNickname(e.target.value)
                }
            />
            <button className="duplicate-confirm"
                type="button"
                onClick={checkDuplicateNickName}
            >중복확인</button>
            <ResultMsg 
                font={dupCheck} {...dupCheck}   
                className="warn-message"
            >{warn}</ResultMsg>
        </div>
    )
}

export default NicknameBox;
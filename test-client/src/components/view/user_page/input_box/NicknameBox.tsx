import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ResultMsg } from '../UserPageStyle';

interface Props{
    pageName : string;
    placeholder : string;
    returnNickname: (data:string, re:boolean) => void;
}

function NicknameBox({ pageName, placeholder, returnNickname }: Props) {
    const [nickname, setNickname] = useState("");
    const [afterDupCheck, setAfterDupCheck] = useState("");
    const [dupCheck, setDupCheck] = useState(false);
    const [warn, setWarn] = useState("");

    //=====blur 처리=====
    const blur = () => {
        if(pageName==="UserRegister"){
            if(!nickname){
                setWarn("🙁 닉네임을 입력해주세요.");
                returnNickname("", false);
                return;
            }
            if(dupCheck === false){
                setWarn("🙁 중복 확인해주세요.");
                returnNickname("", false);
                return;
            }
        }else{
            if(!nickname){
                setWarn("");
                returnNickname("", true);
                return;
            }else{
                if(dupCheck === false){
                    setWarn("🙁 중복 확인해주세요.");
                    returnNickname(".", false);
                    return;
                }
            }

        }
    }
    //=====blur 처리=====

    //=====중복 확인=====
    const checkDuplicateNickName = async () => {
        if(!nickname){
            setWarn("🙁 닉네임을 입력해주세요.");
            setDupCheck(false);
            returnNickname("", false);
            return;
        }

        const response = await axios.post("/nickname_confirm", {nickname : nickname})
            .then(res => res.data)
            .catch(err => err);
        if(response.result === "1"){
            setWarn("🙁 중복된 닉네임 입니다.");
            returnNickname(".", false);
            return;
        }else if(response.result === "0"){
            setWarn("🙂 사용할 수 있는 닉네임 입니다.");
            setDupCheck(true);
            setAfterDupCheck(nickname); 
            returnNickname(nickname, true);
        }else{
            returnNickname("", false);
            alert("알 수 없는 오류가 발생했습니다.");
        }
    }
    //=====중복 확인=====

    useEffect(() => {
        //=====중복 확인 후 닉네임 변경여부 판단=====
        if(pageName==="UserRegister"){
            if(afterDupCheck && afterDupCheck !== nickname && dupCheck === true){
                //중복 확인 했는데 데이터 변화를 감지하면 초기화 
                setAfterDupCheck("");
                setDupCheck(false);
                setWarn("🙁 중복 확인해주세요.");
                returnNickname("", false);
            }
        }else{
            if(nickname){
                if(afterDupCheck && afterDupCheck !== nickname && dupCheck === true){
                    //중복 확인 했는데 데이터 변화를 감지하면 초기화 
                    setAfterDupCheck("");
                    setDupCheck(false);
                    setWarn("🙁 중복 확인해주세요.");
                    returnNickname(".", false);
                }
            }
        }
        //=====중복 확인 후 닉네임 변경여부 판단=====
    }, [nickname, afterDupCheck, dupCheck, returnNickname]);


    return (
        <div className="nickname-container">
            <label htmlFor="nickname-box">별명</label>
            <br/>
            <input 
                onBlur={blur}
                id="nickname-box"
                type="text"
                placeholder={placeholder}
                onChange={(e : React.ChangeEvent<HTMLInputElement>) => 
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
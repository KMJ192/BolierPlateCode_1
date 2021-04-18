import React, { useState } from 'react';
import { ResultMsg } from './UserRegisterStyle';

interface Props{
    containerCName : string;
    title : string;
    id : string
    placeholder : string;
    inputType : string;
}

function InputBoxList({containerCName, title, id, placeholder, inputType}: Props) {
    //유저 데이터 상태 관리
    const [userData, setUserData] = useState(""); 
    //email, nickname 중복 체크 유무(boolean), 중복체크 한 상태 저장
    const [onDupChange, setOnDupChange] = useState([false, ""]); 
    //입력 결과 상태(boolean), 입력결과 메시지
    const [confirmState, setConfirmState] = useState([false, ""]);
    console.log(userData);

    return (
        <>
            <div className={containerCName}>
                <label htmlFor={id}>{title}</label>
                <br/>
                <input 
                    id={id}
                    type={inputType} 
                    placeholder={placeholder}
                    onChange={
                        (e : React.ChangeEvent<HTMLInputElement>) => 
                        setUserData(e.target.value)
                    }
                />
                {containerCName === "email-container" && 
                    <button className="duplicate-confirm">중복확인</button>
                }
                {containerCName === "nickname-container" && 
                    <button className="duplicate-confirm">중복확인</button>
                }
                <ResultMsg 
                    result={confirmState[0]}
                    {...confirmState[0]}   
                    className="warn-message"
                >test</ResultMsg>
            </div>
        </>
        
    )
}

export default InputBoxList;
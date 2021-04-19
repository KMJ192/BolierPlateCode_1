import React, { useEffect, useState } from 'react';
import { ResultMsg } from '../UserRegisterStyle';

interface Props{
    returnPassword : (data:string, re:boolean) => void;
}

//비밀번호 폼 추출
export function ConfirmPasswordForm(asValue: string) {
    let regExp: RegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,25}$/;
    return regExp.test(asValue);
}

function PasswordBox({ returnPassword }: Props) {
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [dataCheck, setDatacheck] = useState({
        password : false,
        password_confirm : false
    });
    const [warn, setWarn] = useState({
        password : "",
        password_confirm : ""
    });

    //비밀번호 blur처리
    const passwordBlur = () =>{
        // if(!password){
        //     setDatacheck({...dataCheck, password : false});
        //     setWarn({...warn, password : "🙁 비밀번호를 입력해주세요."});
        //     return;
        // }
        // if(ConfirmPasswordForm(password) === false){
        //     setDatacheck({...dataCheck, password : false});
        //     setWarn({...warn, password : "🙁 비밀번호양식은 8~25자리 숫자, 영문자 혼합입니다."});
        //     return;
        // }
        setDatacheck({...dataCheck, password : true});
        //setWarn({...warn, password : "🙂 비밀번호 입력 완료 되었습니다."});
    }
    //비밀번호확인 blur처리
    const passwordConfirmBlur = () => {
        // if(!passwordConfirm){
        //     setDatacheck({...dataCheck, password_confirm : false});
        //     setWarn({...warn, password_confirm : "🙁 비밀번호 확인을 입력해주세요."});
        //     return;
        // }
        // if(password !== passwordConfirm){
        //     setDatacheck({...dataCheck, password_confirm : false});
        //     setWarn({...warn, password_confirm : "🙁 비밀번호와 비밀번호 확인이 다릅니다."});
        //     return;
        // }
        setDatacheck({...dataCheck, password_confirm : true});
        //setWarn({...warn, password_confirm : "🙂 비밀번호 확인 입력 완료 되었습니다."});
        //returnPassword(password, true);
    }

    useEffect(() => {
        //비밀번호 변화 감지
        //비밀번호 양식이 맞았었는데 달라진 경우
        console.log(dataCheck.password);
        if(dataCheck.password === true && ConfirmPasswordForm(password) === false){
            //setDatacheck({...dataCheck, password : false});
            setWarn({...warn, password : "🙁 비밀번호양식은 8~25자리 숫자, 영문자 혼합입니다."});
            returnPassword(password, true);
        }
        //비밀번호, 비밀번호 확인이 다를 경우 변화 감지
        //비밀번호 비밀번호 확인이 맞았었는데 변화해서 다시 달라진 경우
        if(password !== passwordConfirm && dataCheck.password_confirm === true){
            setDatacheck({...dataCheck, password_confirm : false});
            setWarn({...warn, password_confirm : "🙁 비밀번호와 비밀번호 확인이 다릅니다."});
            returnPassword("", false);
        }
        //변화 했을때 비밀번호, 비밀번호 확인이 같은 경우
        if(password && password === passwordConfirm && dataCheck.password_confirm === false){
            setDatacheck({...dataCheck, password_confirm : true});
            setWarn({...warn ,password_confirm : "🙂 비밀번호 확인 입력 완료 되었습니다."});
            returnPassword(password, true);
        }
    }, [password, passwordConfirm, dataCheck]);

    return (
        <div>
            <div className="password-container">
                <label htmlFor="password-box">비밀번호</label>
                <br/>
                <input 
                    onFocus={passwordBlur}
                    id="password-box"
                    type="password"
                    placeholder="비밀번호 입력"
                    onChange={(e : React.ChangeEvent<HTMLInputElement>) => 
                        setPassword(e.target.value)
                    }
                />
                <ResultMsg 
                    className="warn-message"
                    font={dataCheck.password} {...dataCheck.password}   
                >{warn.password}</ResultMsg>
            </div>
            <div className="password-container">
                <label htmlFor="password-confirm-box">비밀번호 확인</label>
                <br/>
                <input
                    onBlur={passwordConfirmBlur}
                    id="password-confirm-box"
                    type="password"
                    placeholder="비밀번호 확인"
                    onChange={(e : React.ChangeEvent<HTMLInputElement>) => 
                        setPasswordConfirm(e.target.value)
                    }
                />
                <ResultMsg 
                    className="warn-message"
                    font={dataCheck.password_confirm} {...dataCheck.password_confirm}   
                >{warn.password_confirm}</ResultMsg>
            </div>
        </div>
    );
}

export default PasswordBox;

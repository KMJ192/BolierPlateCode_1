import React, { useEffect, useState } from 'react';
import { ResultMsg } from '../UserRegisterStyle';
import PasswordConfirmBox from './PasswordConfirmBox';

interface Props{
    returnPassword : (data:string, re:boolean) => void;
}

//비밀번호 폼 추출
export function ConfirmPasswordForm(asValue: string) {
    let regExp: RegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,25}$/;
    return regExp.test(asValue);
}

function PasswordBox({ returnPassword }: Props) {
    //password, password_confirm save
    const [onfocus, setOnfocus] = useState({
        password : false,
        password_confirm : false
    });
    const [password, setPassword] = useState({
        password : "",
        password_confirm : ""
    });
    const [dataCheck, setDatacheck] = useState({
        password : false,
        password_confirm : false
    });
    const [warn, setWarn] = useState({
        password : "",
        password_confirm : ""
    });
    //password inputbox blur
    const passwordBlur = () =>{
        setOnfocus({
            ...onfocus,
            password : true
        });
        if(!password){
            setDatacheck({...dataCheck, password : false});
            setWarn({...warn, password : "🙁 비밀번호를 입력해주세요."});
            return;
        }
        if(ConfirmPasswordForm(password.password) === false){
            setDatacheck({...dataCheck, password : false});
            setWarn({...warn, password : "🙁 비밀번호양식은 8~25자리 숫자, 영문자 혼합입니다."});
            return;
        }
        setDatacheck({...dataCheck, password : true});
        setWarn({...warn, password : "🙂 비밀번호 입력 완료 되었습니다."});
    }
    //password_confirm inputbox blur
    const passwordConfirmBlur = () => {
        setOnfocus({
            ...onfocus,
            password_confirm : true
        });
    }
    const getPasswordConfirm = (data : string) => {
        console.log(data);
        setPassword({
            ...password,
            password_confirm : data
        })
    }
    useEffect(() => {
        if(onfocus.password){
            if(!ConfirmPasswordForm(password.password)){
                setDatacheck({...dataCheck, password : false});
                setWarn({...warn, password : "🙁 비밀번호양식은 8~25자리 숫자, 영문자 혼합입니다."});
            }else{
                setDatacheck({...dataCheck, password : true});
                setWarn({...warn, password : "🙂 비밀번호 입력 완료 되었습니다."});
            }
        }
        
        // if(onfocus.password_confirm){
        //     if(onfocus.password_confirm && password.password !== password.password_confirm){
        //         setDatacheck({...dataCheck, password_confirm : false});
        //         setWarn({...warn, password_confirm : "🙁 비밀번호와 비밀번호 확인이 다릅니다."});
        //     }else{
        //         if(password.password_confirm){
        //             setDatacheck({...dataCheck, password_confirm : true});
        //             setWarn({...warn, password_confirm : "🙂 비밀번호 확인 입력 완료 되었습니다."});
        //             //returnPassword(password.password, true);
        //         }
        //     }
        // }
        if(password.password === password.password_confirm) returnPassword(password.password, true);
    }, [password]);

    return (
        <div>
            <div className="password-container">
                <label htmlFor="password-box">비밀번호</label>
                <br/>
                <input 
                    onBlur={passwordBlur}
                    id="password-box"
                    type="password"
                    placeholder="비밀번호 입력"
                    onChange={(e : React.ChangeEvent<HTMLInputElement>) => 
                        setPassword({
                            ...password,
                            password : e.target.value
                        })
                    }
                />
                <ResultMsg 
                    className="warn-message"
                    font={dataCheck.password} {...dataCheck.password}   
                >{warn.password}</ResultMsg>
            </div>
            {/* <div className="password-container">
                <label htmlFor="password-confirm-box">비밀번호 확인</label>
                <br/>
                <input
                    onFocus={passwordConfirmBlur}
                    id="password-confirm-box"
                    type="password"
                    placeholder="비밀번호 확인"
                    onChange={(e : React.ChangeEvent<HTMLInputElement>) => 
                        setPassword({
                            ...password,
                            password_confirm : e.target.value
                        })
                    }
                />
                <ResultMsg 
                    className="warn-message"
                    font={dataCheck.password_confirm} {...dataCheck.password_confirm}   
                >{warn.password_confirm}</ResultMsg>
            </div> */}
            <PasswordConfirmBox
                compareData={password.password}
                returnPasswordConfirm={getPasswordConfirm}
            />
        </div>
    );
}
export default PasswordBox;
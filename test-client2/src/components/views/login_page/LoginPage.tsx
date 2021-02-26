import React, { SyntheticEvent, useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css';
import logo from './rust_logo.png';


const LoginPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRidrect] = useState(false);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        //자격증명
        const {data} = await axios.post('/api/user-auth/login', {
            email,
            password
        }, {withCredentials:true}); //server로부터 token을 확인받음

        if(data["message"] === "None email"){
            alert("등록된 메일이 아닙니다. 다시 확인해주세요");
        }else if(data["message"] === "Different pw"){
            alert("비밀번호가 다릅니다.");
        }else if(data["message"] === "Login success"){
            setRidrect(true);
        }
        else{
            alert("알수없는 오류가 발생했습니다.");
        }
    }

    if(redirect){
        return <Redirect to={'/'} />
    }
    return(
        <div id="signin_form">
            <main className="form-signin">
                <form onSubmit={submit}>
                    <a href="/">
                        <img id="logo" src={logo} alt="" width="70" height="70"/>
                    </a>
                    <h1 className="h3 mb-3 fw-normal">Login info</h1>
                    <input type="email" id="inputEmail" className="form-control" placeholder="이메일" required autoFocus
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input type="password" id="inputPassword" className="form-control" placeholder="비밀번호" required
                        onChange={e => setPassword(e.target.value)}
                    />
                    <div className="checkbox mb-3">
                        <label>
                            <input type="checkbox" value="remember-me"/> Remember
                        </label>
                    </div>
                    <button className="w-100 btn btn-lg btn-primary" type="submit">로그인</button>
                    <div>
                        회원가입이 필요하면 → 
                        <a href="/register_user">
                            회원가입 페이지
                        </a>
                    </div>
                </form>
            </main>
        </div>
    )
}

export default LoginPage

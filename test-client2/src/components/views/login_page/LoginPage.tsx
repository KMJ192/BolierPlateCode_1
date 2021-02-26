import React, { Component, SyntheticEvent, useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css';
import logo from './rust_logo.png';

// const [email, setEmail] = useState('');
// const [password, setPassrod] = useState('');

const LoginPage = () => {
    // email : string= "";
    // password : string= "";
    // state = {
    //     redirect : false
    // }

    // submit = async (e : SyntheticEvent) => {
    //     e.preventDefault();
    //     const response = await axios.post('/api/login', {
    //         email : this.email,
    //         password : this.password
    //     });

    //     if(response.data["message"] === "Login success"){
    //         this.setState({
    //             redirect : true
    //         });
    //     }else if(response.data["message"] === "Different pw"){
    //         alert("비밀번호가 맞지 않습니다");
    //     }else if(response.data["message"] === "None email"){
    //         alert("등록되지 않은 email입니다.");
    //     }
    //     else{
    //         alert("알수없는 오류가 발생하였습니다.");
    //     }
    // }
        // if(this.state.redirect === true){
        //     return <Redirect to={'/'}/>
        // }

    return(
        <div id="signin_form">
            <main className="form-signin">
                <form>
                    <a href="/">
                        <img id="logo" src={logo} alt="" width="70" height="70"/>
                    </a>
                    <h1 className="h3 mb-3 fw-normal">Login info</h1>
                    <input type="email" id="inputEmail" className="form-control" placeholder="이메일" required autoFocus
                        //onChange={e => this.email = e.target.value}
                    />
                    <input type="password" id="inputPassword" className="form-control" placeholder="비밀번호" required
                        //onChange={e => this.password = e.target.value}
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

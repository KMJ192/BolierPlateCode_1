import React, { Component, SyntheticEvent } from 'react';
import './RegisterPage.css';
import logo from './rust_logo.png';
import axios from 'axios';

class RegisterPage extends Component {
    name = "";
    email = "";
    password = "";
    password_confirm= "";

    submit = (e : SyntheticEvent) => {
        //확인 버튼을 눌렀을때 페이지 새로고침(기본동작) 방지 및 데이터 전체 submit
        e.preventDefault();
        if(this.password == this.password_confirm){
            axios.post("/api/test", {
                email : this.email,
                password : this.password,
                name : this.name,
                user_image : "",
                user_rol : 0,
                created_by : this.name,
                updated_by : this.name
            }).then(res => {
                console.log(res);
            });
        }else{
            alert("패스워드와 패스워드 확인의 내용이 다릅니다. 다시 확인해주세요.");
        }
    }

    render() {
        return (
            <div id="register_form">
                <main className="form-signin">
                    <form onSubmit={this.submit}>
                        <a href="/">
                            <img id="logo"src={logo} alt="" width="70" height="70"/>
                        </a>
                        <h1 className="h3 mb-3 fw-normal">정보를 입력하세요</h1>
                        <input id="inputname" className="form-control" placeholder="이름" required autoFocus
                            onChange={e => this.name = e.target.value}
                        />
                        <input type="email" id="inputEmail" className="form-control" placeholder="이메일" required
                            onChange={e => this.email = e.target.value}
                        />
                        <input type="password" id="inputPassword" className="form-control" placeholder="비밀번호" required
                            onChange={e => this.password = e.target.value}
                        />
                        <input type="password" className="form-control" placeholder="비밀번호 확인" required
                            onChange={e => this.password_confirm = e.target.value}
                        />
                        <button id="confirm" className="w-100 btn btn-lg btn-primary" type="submit">확인</button>
                        <a href="/login_user">
                            로그인 페이지
                        </a>
                    </form>
                </main>
            </div>
        )
    }
}

export default RegisterPage

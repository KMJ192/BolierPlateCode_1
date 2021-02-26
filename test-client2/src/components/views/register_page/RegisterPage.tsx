import React, { Component, SyntheticEvent } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import './RegisterPage.css';
import logo from './rust_logo.png';

class RegisterPage extends Component {
    name : string= "";
    email : string= "";
    password : string = "";
    password_confirm : string= "";
    state = {
        redirect : false
    };

    submit = async (e : SyntheticEvent) => {
        //확인 버튼을 눌렀을때 페이지 새로고침(기본동작) 방지 및 데이터 전체 submit
        e.preventDefault();
        if(this.password === this.password_confirm){
            const response = await axios.post("/api/register_user", {
                email : this.email,
                password : this.password,
                name : this.name,
                user_image : "",
                user_rol : 0,
                created_by : this.name,
                updated_by : this.name
            });
            if(response.data["message"] === "Duplicated email"){
                alert("이미 등록된 이메일 입니다.");
            }else if(response.data["message"] === "Signup success"){
                alert("등록에 성공하였습니다.");
                this.setState({
                    redirect : true
                })
            }else{
                alert("알수없는 오류가 발생하였습니다.");
            }
        }else{
            alert("패스워드와 패스워드 확인의 내용이 다릅니다. 다시 확인해주세요.");
        }
    }

    render() {
        if(this.state.redirect === true){
            return <Redirect to={'/login_user'} />
        }

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

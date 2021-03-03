import React, { Component, SyntheticEvent } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import './RegisterPage.css';
import OutputImage from '../../../images/Images';

class RegisterPage extends Component {
    name : string= "";
    email : string= "";
    password : string = "";
    password_confirm : string= "";
    state = {
        redirect : false,
        userimageBase64: "",
        userimage : null
    };
    
    fileChangedHandler = (e : any) => {
        //이미지 파일 미리보기 설정
        let reader = new FileReader();
        reader.onloadend = () => {
            if(reader.result) {
                this.setState({
                    userimageBase64: String(reader.result)
                });
            }
        };
        //파일 설정했을 경우 userimage에 파일 설정
        if(e.target.files[0]){
            reader.readAsDataURL(e.target.files[0]);
            this.setState({
                userimage : e.target.files[0]
            });
        }
    };

    //대표이미지 삭제 function
    handleRemove = () => {
        this.setState({
            userimageBase64 : "",
            userimage : null
        });
    };

    submit = async (e : SyntheticEvent) => {
        //확인 버튼을 눌렀을때 페이지 새로고침(기본동작) 방지 및 데이터 전체 submit
        e.preventDefault();
        //빈칸이 있는지 검사, 탭 포함
        if(this.password === this.password_confirm){
            await axios.post("/api/register_user", {
                email : this.email,
                password : this.password,
                name : this.name,
                user_image : "", //유저이미지랑 유저데이터 json으로 한번에 보내는 방법 찾아야 됨
                user_rol : 0,
                created_by : this.name,
                updated_by : this.name
            }).then((response) => {
                if(response.data["message"] === "Duplicated email"){
                    alert("이미 등록된 메일입니다.")
                }else if(response.data["message"] === "Signup success"){
                    // ================= 유저 정보 등록 성공 ================= 
                    alert("등록에 성공하였습니다.");
                    this.setState({
                        redirect : true
                    });
                }else{
                    alert("알수없는 오류가 발생하였습니다.");
                }
            }).catch((err) => {
                alert("오류가 발생했습니다. 오류내용 : " + err);
            });
        }else{
            alert("패스워드와 패스워드 확인의 내용이 다릅니다. 다시 확인해주세요.");
        }
    };

    render() {
        if(this.state.redirect === true){
            return <Redirect to={'/login_user'} />;
        }

        return (
            <div id="register_form">
                <main className="form-signin">
                    <a href="/">
                        <img id="logo" src={OutputImage(1)} alt="" width="70" height="70"/>
                    </a>
                    <h1 className="h3 mb-3 fw-normal">가입 정보를 입력하세요</h1>
                    <div className="userimage-box">
                        <div className="userimage-info">대표사진설정</div>
                        <div className="userimage-place">
                            {this.state.userimageBase64 ? (
                                <img className="userimage" src={this.state.userimageBase64} alt="대표이미지 설정" onClick={this.handleRemove} />
                            ) : (
                                <div></div>
                            )}
                        </div>
                        <label htmlFor="userimage-button" className="btn-primary userimage-button">내 PC에서 찾기</label>
                        <input id="userimage-button" type="file" onChange={this.fileChangedHandler}/>
                    </div>
                    <form onSubmit={this.submit}>
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
        );
    }
}

export default RegisterPage

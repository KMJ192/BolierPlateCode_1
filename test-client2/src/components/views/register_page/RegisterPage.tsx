import React, { Component, SyntheticEvent } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import './RegisterPage.css';
import OutputImage from '../../../images/Images';

let formData = new FormData();

class RegisterPage extends Component {
    private name : string= "";
    private email : string= "";
    private password : string = "";
    private password_confirm : string = "";
    private register_success : boolean = false;

    state = {
        redirect : false,
        userimageBase64: "",
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
        }

        //파일 설정했을 경우 userimage에 파일 설정
        if(e.target.files[0]){
            reader.readAsDataURL(e.target.files[0]);
            formData.append("user_image", e.target.files[0]);
        }
    };

    //대표이미지 삭제 function
    handleRemove = () => {
        this.setState({
            userimageBase64 : ""
        });
        formData.delete("user_image");
    };

    submit = async (e : SyntheticEvent) => {
        //formData에 입력
        formData.append("email", this.email);
        formData.append("password", this.password);
        formData.append("name", this.name);
        formData.append("user_rol", "0");
        formData.append("created_by", this.name);
        formData.append("updated_by", this.name);

        //확인 버튼을 눌렀을때 페이지 새로고침(기본동작) 방지 및 데이터 전체 submit
        e.preventDefault();
        //빈칸이 있는지 검사, 탭 포함
        if(this.password === this.password_confirm){
            await axios.post("/register_user", formData).then((response) => {
                if(response.data["message"] === "Duplicated email"){
                    alert("이미 등록된 메일입니다.")
                }else if(response.data["message"] === "Duplicated name"){
                    alert("중복된 이름입니다. 다른 이름을 입력해주세요.")
                }else if(response.data["message"] === "Signup success"){
                    // ================= 유저 정보 등록 성공 ================= 
                    alert("등록에 성공하였습니다.");
                    this.setState({ 
                        redirect : true
                    });
                    this.register_success = true;
                }else{
                    alert("알수없는 오류가 발생하였습니다." + response);
                }
            }).catch((err) => {
                alert("오류가 발생했습니다. 오류내용 : " + err);
            });
        }else{
            alert("패스워드와 패스워드 확인의 내용이 다릅니다. 다시 확인해주세요.");
        }

        //등록에 실패한 경우 formData의 내용을 제거
        if(this.register_success !== true){
            formData.delete("email");
            formData.delete("password");
            formData.delete("name");
            formData.delete("user_rol");
            formData.delete("created_by");
            formData.delete("updated_by");
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
                    <form onSubmit={this.submit}>
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

import React, { useState, useEffect, SyntheticEvent } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import './UserPatchPage.css';
import OutputImage from '../../../images/Images';
import { server_url } from '../../../server_url/server_url';

let formData = new FormData();

function UserPatchPage() {
    
    useEffect(() => {
        (
            async () => {
                const {data} = await axios.get('/user');
                if(data["result"] === true){
                    setName(data["username"]);
                    setEmail(data["useremail"]);
                    setUserImageBase64(server_url + "/uimg/" + data["userimage"]);
                }
            }
        )();
    }, []);

    //기존 이름, 대표이미지는 가져오기
    const [userimageBase64, setUserImageBase64] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordComfirm] = useState("");
    const [redirect, setRedirect] = useState(false);

    let patch_success : boolean = false;

    const fileChangedHandler = (e : any) => {
        //이미지 파일 미리보기 설정
        let reader = new FileReader();
        reader.onloadend = () => {
            if(reader.result) {
                setUserImageBase64(String(reader.result));
            }
        };

        //파일을 변경했을 경우 formData에 image 담기
        if(e.target.files[0]){
            reader.readAsDataURL(e.target.files[0]);
            formData.append("user_image", e.target.files[0]);
        }
    };

    //대표이미지 삭제 function
    const handleRemove = () => {
        //useState에 담겨진 이미지 삭제 및 formData의 user_image 삭제
        setUserImageBase64("");
        formData.delete("user_image");
    };

    const submit = async (e : SyntheticEvent) => {
        //formData에 입력
        formData.append("password", password);
        formData.append("name", name);
        formData.append("updated_by", name);

        //확인 버튼을 눌렀을때 페이지 새로고침(기본동작) 방지 및 데이터 전체 submit
        e.preventDefault();
        //빈칸이 있는지 검사, 탭 포함
        if(password === passwordConfirm){
            await axios.post("/patch_user", formData).then((response) => {
                if(response.data["patch"] === true){
                    alert("회원 정보를 수정하였습니다.");
                    setRedirect(true);
                    patch_success = true;
                }else{
                    if(response.data["message"] === "Duplicated name"){
                        alert("중복된 이름입니다. 다른 이름을 입력해주세요.");
                    }else{
                        alert("알수없는 오류가 발생하였습니다.");
                    }
                }
            }).catch((err) => {
                alert("오류가 발생했습니다. 오류내용 : " + err);
            });
        }else{
            alert("패스워드와 패스워드 확인의 내용이 다릅니다. 다시 확인해주세요.");
        }

        //등록에 실패한 경우 formData의 내용을 제거
        if(patch_success !== true){
            formData.delete("password");
            formData.delete("name");
            formData.delete("updated_by");
        }
    };

    if(redirect === true){
        //유저 정보를 수정완료한 후 메인페이지로 이동
        return <Redirect to={'/'} />;
    }

    return (
        <div id="register_form">
            <main className="form-signin">
                <a href="/">
                    <img id="logo" src={OutputImage(1)} alt="" width="70" height="70"/>
                </a>
                <h1 className="h3 mb-3 fw-normal">유저 정보 수정</h1>
                <form onSubmit={submit}>
                    <div className="userimage-box">
                        <div className="userimage-info">대표사진수정</div>
                        <div className="userimage-place">
                            {userimageBase64 ? (
                                <img className="userimage" src={userimageBase64} alt="대표이미지 설정" onClick={handleRemove} />
                            ) : (
                                <div></div>
                            )}
                        </div>
                        <label htmlFor="userimage-button" className="btn-primary userimage-button">내 PC에서 찾기</label>
                        <input id="userimage-button" type="file" onChange={fileChangedHandler}/>
                    </div>
                    <input type="email" id="inputEmail" className="form-control" placeholder={email} readOnly={true} required />
                    <input id="inputname" className="form-control" value={name} placeholder="이름" required autoFocus
                        onChange={e => setName(e.target.value)}
                    />
                    <input type="password" id="inputPassword" className="form-control" placeholder="비밀번호" required
                        onChange={e => setPassword(e.target.value)}
                    />
                    <input type="password" className="form-control" placeholder="비밀번호 확인" required
                        onChange={e => setPasswordComfirm(e.target.value)}
                    />
                    <button id="confirm" className="w-100 btn btn-lg btn-primary" type="submit">확인</button>
                </form>
            </main>
        </div>
    );
}

export default UserPatchPage

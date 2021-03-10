import React, { useState } from 'react';
import './AfterLogin.css'
import axios from 'axios';

function AfterLogin(props : any) {
    
    async function logout(){
        return await axios.post("/logout", {});
    }

    async function deleteReq() {
        return await axios.delete("/delete_user/" + props.email, {
                data: props.email
            });
    }

    //유저 삭제할 경우 logout 및 유저 삭제
    const deleteUser = async() => {
        await axios.all([
            logout(),
            deleteReq()
        ]).catch((err) => {
            alert("오류 발생 : " + err);
        });
    };
    
    const [uInfoSelect, setuInfoSelect] = useState(false);

    return (
        <div>
            <ul>
                <li>
                    <img id="user-logo" src={props.image} alt="회원사진"
                        onClick={() => uInfoSelect ? setuInfoSelect(false) : setuInfoSelect(true)}
                    />
                </li>
            </ul>
            <div className={(uInfoSelect) ? "dropdown-menu dropdown-menu-right show" : "dropdown-menu dropdown-menu-right"}>
                <div className="dorpdown-group">
                    <div className="dropdown-item">{props.name} 님</div>
                </div>
                <div className="dropdown-divider"></div>
                <div className="dorpdown-group">
                    <a className="dropdown-item" href="/patch_user">정보수정</a>
                </div>
                <div className="dropdown-divider"></div>
                <div className="dropdown-gruop">
                    <a className="dropdown-item" href="/" onClick={logout}>Logout</a>
                </div>
                <div className="dropdown-divider"></div>
                <div className="dropdown-gruop">
                    <a className="dropdown-item" href="/" onClick={deleteUser}>회원탈퇴</a>
                </div>
            </div>
        </div>
    )
}

export default AfterLogin
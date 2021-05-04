import React, { useCallback, useEffect, useRef, useState } from 'react'
import axios from 'axios';
import { user_image_path } from '../../../../path/ImagePath'
import { user_patch_page } from '../../../../path/PagePath';
import { server_url } from '../../../../path/Url';
import { UserDropdown } from '../NavBarStyled'

interface Props{
    useremail? : string;
    nickname? : string;
    user_image? : string;
}

function AfterLogin({useremail, nickname, user_image} : Props) {
    const dropdownRef = useRef<HTMLDivElement>(null);
    const userImageRef = useRef<HTMLImageElement>(null);
    const [dropdown, setDropDown] = useState(false);
    const [userImage, setUserImage] = useState(user_image_path);
    const handleClickOutside = useCallback((e : MouseEvent) => {
        //dropdownRef가 잡혀져 있고, dropdownRef의 자손 dom이 아닐경우
        //자손 dom을 클릭했을 경우에는 해당 dom에 대한 action이 필요하므로
        if(dropdownRef.current && !dropdownRef.current.contains(e.target as Node)){
            //image를 클릭했을 때
            if(userImageRef.current?.contains(e.target as Node)) {
                setDropDown(!dropdown)
            }
            else {
                setDropDown(false);
            }
        }
    },[dropdownRef, userImageRef, dropdown]);

    useEffect(() => {
        if(user_image) setUserImage(server_url + "/uimg/" + String(user_image));
        document.addEventListener("click", handleClickOutside, true);
        return () => {
            document.removeEventListener("click", handleClickOutside, true);
        };
    }, [userImage, user_image, handleClickOutside]);

    const logOut = async (e : React.MouseEvent<HTMLAnchorElement>) => {
        const request = await axios.post("/logout")
            .then(response => response.data)
            .catch(err => err);
        if(request["message"] === "success") alert("로그 아웃 되었습니다.");
        else alert("오류 발생 : " + request);
    }
    

    return (
        <ul className="user-option-container">
            <li><i className="far fa-bell"/></li>
            <li>
                <img ref={userImageRef} src={userImage} alt="user"/>
                <UserDropdown className="user-menu" ref={dropdownRef} toggle={dropdown} {...dropdown} >
                    <a href={user_patch_page}>{nickname}</a>
                    <div className="line"/>
                    <a href={user_patch_page}>회원정보수정</a>
                    <div className="line"/>
                    <a href="/" onClick={logOut}>로그아웃</a>
                </UserDropdown>
            </li>
        </ul>
    )
}

export default React.memo(AfterLogin);
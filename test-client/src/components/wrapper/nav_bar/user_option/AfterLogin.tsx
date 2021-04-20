import React, { useEffect, useRef, useState } from 'react'
import { StringMappingType } from 'typescript';
import { user_image_path } from '../../../../path/ImagePath'
import { UserDropdown } from '../NavBarStyled'

interface Props{
    useremail : string;
    nickname : string;
    user_image : string;
}

function AfterLogin({useremail, nickname, user_image} : Props) {
    const dropdownRef = useRef<HTMLDivElement>(null);
    const userImageRef = useRef<HTMLImageElement>(null);
    const [dropdown, setDropDown] = useState(false);
    const handleClickOutside = (e : MouseEvent) => {
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
    }
    useEffect(() => {
        document.addEventListener("click", handleClickOutside, true);
        return () => {
            document.removeEventListener("click", handleClickOutside, true);
        };
    }, []);

    return (
        <ul className="user-option-container">
            <li><i className="far fa-bell"/></li>
            <li>
                <img ref={userImageRef} src={user_image_path} alt="user"/>
                <UserDropdown className="user-menu" ref={dropdownRef} toggle={dropdown} {...dropdown} >
                    <a href="#">usermenu1</a>
                    <hr/>
                    <a href="#">usermenu2</a>
                    <hr/>
                    <a href="#">usermenu3</a>
                </UserDropdown>
            </li>
        </ul>
    )
}

export default AfterLogin
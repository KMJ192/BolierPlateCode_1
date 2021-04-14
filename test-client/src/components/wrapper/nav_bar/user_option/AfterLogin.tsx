import React, { useEffect, useRef, useState } from 'react'
import { user_image_path } from '../../../../path/ImagePath'
import { UserDropdown } from '../NavBarStyled'

function AfterLogin() {
    const dropdownRef = useRef<HTMLDivElement>(null);
    const userImageRef = useRef<HTMLImageElement>(null);
    const [dropdown, setDropDown] = useState(false);

    const handleClickOutside = (e : MouseEvent) => {
        //dropdownRef가 잡혀져 있고, dropdownRef의 자손 dom이 아닐경우
        //자손 dom을 클릭했을 경우에는 해당 dom에 대한 action이 필요하므로
        if(dropdownRef.current && !dropdownRef.current.contains(e.target as Node)){
            if(userImageRef.current?.contains(e.target as Node)) {
                if(dropdown === true) {
                    console.log("true");
                    setDropDown(false);
                }
                else {
                    console.log("false");
                    setDropDown(true);
                }
                console.log("image 클릭");
            }
            else {
                setDropDown(false);
                console.log("외부 클릭");
            }
        }
    }
    console.log("상태 " + dropdown);
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
                <img ref={userImageRef} className="user-image"  src={user_image_path} alt="user"/>
                <UserDropdown ref={dropdownRef} toggle={dropdown} {...dropdown} className="user-menu">
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
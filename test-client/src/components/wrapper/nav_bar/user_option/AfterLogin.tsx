import React, { useEffect, useRef, useState } from 'react'
import { user_image_path } from '../../../../path/ImagePath'
import { UserDropdown } from '../NavBarStyled'

function AfterLogin() {
    const re = useRef<HTMLDivElement>(null);
    const [dropdown, setDropDown] = useState(false);
    const toggleDropdown = () => {
        setDropDown(!dropdown);
    }
    const handleClickOutside = (e : MouseEvent) => {
        if(re.current && !re.current.contains(e.target as Node)){
            setDropDown(false);
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
            <li><i className="far fa-bell"></i></li>
            <li>
                <img className="user-image" onClick={toggleDropdown} src={user_image_path} alt="user"/>
                <UserDropdown ref={re} toggle={dropdown} {...dropdown} className="user-menu">
                    <a href="#">usermenu1</a>
                    <a href="#">usermenu2</a>
                    <a href="#">usermenu3</a>
                </UserDropdown>
            </li>
        </ul>
    )
}

export default AfterLogin
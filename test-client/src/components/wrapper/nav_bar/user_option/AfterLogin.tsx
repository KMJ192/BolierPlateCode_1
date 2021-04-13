import React from 'react'
import { user_image_path } from '../../../../path/ImagePath'

function AfterLogin() {
    return (
        <ul className="user-option-container">
            <li><i className="far fa-bell"></i></li>
            <li>
                <img className="user-image" src={user_image_path} alt="user"/>
            </li>
        </ul>
    )
}

export default AfterLogin

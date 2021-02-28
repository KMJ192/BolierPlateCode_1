import React from 'react';
import BeforeLogin from '../sign_menu/BeforeLogin';
import AfterLogin from '../sign_menu/AfterLogin';
import './UserMenu.css';

function UserMenu(props : any) {
    return(
        <div id="user-auth-container">
            {props.token ? (
                <AfterLogin name={props.name}/>
            ) : (
                <BeforeLogin/>
            )}
        </div>
        
    );
}

export default UserMenu
import React from 'react';
import BeforeLogin from './sign_menu/BeforeLogin';
import AfterLogin from './sign_menu/AfterLogin';
import './UserMenu.css';

function UserMenu(props : any) {
    return(
        <div id="user-auth-container">
            {props.token ? (
                <AfterLogin name={props.name} image={props.image} email={props.email}/>
            ) : (
                <BeforeLogin/>
            )}
        </div>
        
    );
}

export default UserMenu
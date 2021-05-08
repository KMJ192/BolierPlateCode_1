import React from 'react';
import axios from 'axios';
import { useEffect } from 'react';

function Auth(Component : any, option : boolean) {
    useEffect(() => {
        const request = axios.get('/user')
        .then(response => response.data)
        .catch(err => err);
        console.log(request);
    }, []);
    
    return (
        <>
            <Component/>
        </>
    );
}

export default Auth;
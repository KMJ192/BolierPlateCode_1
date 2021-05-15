import React from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { login_page } from '../path/PagePath';

async function AuthUser(){
    return await axios.get('/user')
        .then((response : AxiosResponse) => response.data)
        .catch((err : AxiosError) => err);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function(Component : React.ComponentType, option : boolean, login : boolean | null = null) {
    function Authentication(){
        //const response = AuthUser();
        useEffect(() => {
            if(option){                
                // (async () => {
                //     const request = await axios.get('/user')
                //         .then(response => response.data)
                //         .catch(err => err);
                        
                //     if(!request["result"] && request["message"] === "none jwt"){
                //         <Redirect to={login_page}/>   
                //     }else if(request["result"] && login){
                //         console.log(request);
                //         <Redirect to="/" />
                //     }
                // })();
            }
        }, []);
        return (
            <Component/>
        );
    }
    
    return Authentication;
}
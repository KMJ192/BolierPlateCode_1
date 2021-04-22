import React, { useState, useEffect } from 'react';
import PasswordBox from './PasswordBox';
import PasswordConfirmBox from './PasswordConfirmBox';

interface Props{
    pageName : string;
    returnPassword : (data : string, re : boolean) => void;
}

function PasswordContainer({pageName, returnPassword} : Props) {
    const [password, setPassword] = useState("");
    const [dataConfirm, setDataConfirm] = useState({
        password: false,
        password_confirm : false
    });

    const getPassword = (data : string, success : boolean) => {
        setPassword(data);
        setDataConfirm({
            ...dataConfirm,
            password : success
        });
    }
    const getPasswordConfirm = (success : boolean) => {
        setDataConfirm({
            ...dataConfirm,
            password_confirm : success
        });
    }

    useEffect(() => {
        if(dataConfirm.password === true && dataConfirm.password_confirm === true){
            returnPassword(password, true);
        }else{
            returnPassword("", false);
        }
    }, [dataConfirm])

    return (
        <div>
            <PasswordBox
                pageName={pageName}
                returnPassword={getPassword}
            />
            <PasswordConfirmBox
                pageName={pageName}
                compareData={password}
                returnSuccess={getPasswordConfirm}
            />
        </div>
    );
}

export default PasswordContainer;
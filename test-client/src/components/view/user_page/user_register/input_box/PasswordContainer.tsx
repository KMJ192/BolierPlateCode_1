import React, { useState, useEffect, useCallback } from 'react';
import PasswordBox from './PasswordBox';
import PasswordConfirmBox  from './PasswordConfirmBox';

interface Props{
    returnPassword : (data : string, re : boolean) => void;
}

function PasswordContainer({ returnPassword } : Props) {
    const [password, setPassword] = useState("");
    const [dataConfirm, setDataConfirm] = useState({
        password: false,
        password_confirm : false
    });

    const getPassword = useCallback((data : string, success : boolean) => {
        setPassword(data);
        setDataConfirm({
            ...dataConfirm,
            password : success
        });
    }, [dataConfirm]);

    const getPasswordConfirm = useCallback((success : boolean) => {
        setDataConfirm({
            ...dataConfirm,
            password_confirm : success
        });
    }, [dataConfirm]);

    useEffect(() => {
        if(dataConfirm.password === true && dataConfirm.password_confirm === true){
            returnPassword(password, true);
        }else{
            returnPassword("", false);
        }
    }, [dataConfirm]);
    
    return (
        <div>
            <PasswordBox
                passwordData={getPassword}
            />
            <PasswordConfirmBox
                compareData={password}
                passwordConfirmData={getPasswordConfirm}
            />
        </div>
    );
}

export default React.memo(PasswordContainer);
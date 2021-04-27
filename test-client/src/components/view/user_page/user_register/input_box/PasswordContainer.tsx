import React, { useState, useEffect, useCallback } from 'react';
import PasswordBox from './PasswordBox';
import PasswordConfirmBox from './PasswordConfirmBox';

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

    // const getPassword = (data : string, success : boolean) => {
    //     setPassword(data);
    //     setDataConfirm({
    //         ...dataConfirm,
    //         password : success
    //     });
    // }

    const getPasswordConfirm = useCallback((success : boolean) => {
        console.log(success);
        setDataConfirm({
            ...dataConfirm,
            password_confirm : success
        });
    }, [dataConfirm]);
    
    // const getPasswordConfirm = (success : boolean) => {
    //     setDataConfirm({
    //         ...dataConfirm,
    //         password_confirm : success
    //     });
    // }

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
                returnPassword={getPassword}
            />
            <PasswordConfirmBox
                compareData={password}
                returnSuccess={getPasswordConfirm}
            />
        </div>
    );
}

export default React.memo(PasswordContainer);
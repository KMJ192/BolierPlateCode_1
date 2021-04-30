import React, { useState, useEffect, useCallback } from 'react';
import UserPatchPasswordBox from './UserPatchPasswordBox';
import UserPatchPasswordConfirmBox  from './UserPatchPasswordConfirmBox';

interface Props{
    returnPassword : (data : string, re : boolean) => void;
}

function UserPatchPasswordContainer({ returnPassword } : Props) {
    const [password, setPassword] = useState("");
    const [dataConfirm, setDataConfirm] = useState({
        password: true,
        password_confirm : true
    });

    const getPassword = useCallback((data : string, success : boolean) => {
        setPassword(data);
        if(dataConfirm.password !== success){
            setDataConfirm({
                ...dataConfirm,
                password : success
            });
        }
    }, [dataConfirm]);

    const getPasswordConfirm = useCallback((success : boolean) => {
        if(dataConfirm.password_confirm !== success){
            setDataConfirm({
                ...dataConfirm,
                password_confirm : success
            });
        }
    }, [dataConfirm]);

    useEffect(() => {
        if(dataConfirm.password === true && dataConfirm.password_confirm === true){
            returnPassword(password, true);
        }else{
            returnPassword("", false);
        }
    }, [password, dataConfirm, returnPassword]);
    
    return (
        <div>
            <UserPatchPasswordBox
                passwordData={getPassword}
            />
            <UserPatchPasswordConfirmBox
                compareData={password}
                passwordConfirmData={getPasswordConfirm}
            />
        </div>
    );
}

export default React.memo(UserPatchPasswordContainer);
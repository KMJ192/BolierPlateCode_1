import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux-module/RootReducer';
import { StyledLoginButton } from '../LoginPageStyle';

interface Props{
    type: "button" | "submit";
    className: string;
    value : string
}

const defualtButtonWidth: number = 325;
const diffButtonWidth: number = 120;

function LoginButton( { type, className, value } : Props) {
    const [winWidth, setWinWidth] = useState(defualtButtonWidth);
    
    const windowSize = useSelector((state : RootState) => state.screen_size);
    useEffect(() => {
        if(windowSize.width < 435 
            && windowSize.width > 245
            && winWidth !== (windowSize.width - diffButtonWidth)){
                setWinWidth(windowSize.width - diffButtonWidth);
            }
        if(windowSize.width >= 435
            && winWidth !== defualtButtonWidth){
                setWinWidth(defualtButtonWidth);
            }
    }, [winWidth, windowSize.width]);

    return (
        <StyledLoginButton
            className={className}
            type={type}
            width={winWidth} {...winWidth}
        >
            {value}
        </StyledLoginButton>
    )
}

export default React.memo(LoginButton);

import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux-module/RootReducer';
import { StyledLoginInput } from '../LoginPageStyle';

interface Props{
    placeholder: string;
    type: string;
    className: string;
    setData : (e : React.ChangeEvent<HTMLInputElement>) => void
}

const defaultInputWidth: number = 300;
const diffInputWidth: number = 140;

function LoginInput( { placeholder, type, className, setData } : Props ) {
    const [winWidth, setWinWidth] = useState(defaultInputWidth);
    
    const windowSize = useSelector((state : RootState) => state.screen_size);
    useEffect(() => {
        if(windowSize.width < 435 
            && windowSize.width > 245
            && winWidth !== windowSize.width - diffInputWidth) {
                setWinWidth(windowSize.width - diffInputWidth);
        }
        if(windowSize.width >= 435 
            && winWidth !== defaultInputWidth){
            setWinWidth(defaultInputWidth);
        }
    }, [winWidth, windowSize.width]);

    return (
        <StyledLoginInput
            className={className}
            placeholder={placeholder}
            type={type} 
            onChange={setData}
            width={winWidth} {...winWidth}
        />
    );
}

export default React.memo(LoginInput);

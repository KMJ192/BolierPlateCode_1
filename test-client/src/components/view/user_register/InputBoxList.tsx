import React from 'react';
import { ErrorMessage } from 'formik';

interface Props{
    containerCName : string;
    title : string;
    id : string
    placeholder : string;
    inputType : string;
}

function InputBoxList({
        containerCName,
        title,
        id,
        placeholder,
        inputType, 
    }: Props) {
    return (
        <>
            <div className={containerCName}>
                <label htmlFor={id}>{title}</label>
                <br/>
                <input 
                    id={id}
                    type={inputType} 
                    placeholder={placeholder}
                />
                {containerCName === "email-container" && 
                    <button className="duplicate-confirm">중복확인</button>
                }
                {containerCName === "nickname-container" && 
                    <button className="duplicate-confirm">중복확인</button>
                }
            </div>
            {/* <ErrorMessage 
                component="div"
                name={id}
                className="warn-message"
            /> */}
        </>
        
    )
}

export default InputBoxList;
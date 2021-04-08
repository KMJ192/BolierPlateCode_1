import React, { useState } from 'react';
import {NavSideDiv, NavSideDataLi, NavSideA, NavSideSpan } from './NavSideStyle';
import { NavSideData } from './NavSideData';

interface Props{
    open: boolean;
}

function NavSide({open} : Props) {
    //const [preparing, setPreparing] = useState(false);
    
    // const menuClickEvent = (e : React.MouseEvent<HTMLAnchorElement>) => {
    //     alert("준비중입니다.");
    // }

    return (
        <NavSideDiv open={open} {...open}>
            {NavSideData.map((item, index) => {
                return(
                    <NavSideDataLi key={index}>
                        <NavSideA href={item.path} open={open} {...open}
                            onClick={() => item.title === "Stock" && alert("준비중입니다")}
                        >
                            {item.icon}
                            <NavSideSpan open={open} {...open}>
                                {item.title}
                            </NavSideSpan>
                        </NavSideA>
                    </NavSideDataLi>
                )
            })}
        </NavSideDiv>
    )
}

export default NavSide

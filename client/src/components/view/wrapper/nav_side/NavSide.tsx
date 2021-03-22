import React from 'react';
import {NavSideDiv, NavSideDataLi, NavSideA, NavSideSpan } from './NavSideStyle';
import { NavSideData } from './NavSideData';

interface Props{
    open: boolean;
}

function NavSide({open} : Props) {
    return (
        <NavSideDiv open={open} {...open}>
            {NavSideData.map((item, index) => {
                return(
                    <NavSideDataLi key={index}>
                        <NavSideA href={item.path} open={open} {...open}>
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

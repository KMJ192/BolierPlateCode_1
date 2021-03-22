import styled, { css } from "styled-components";

export const NavSideDiv = styled.div`
    position: fixed;
    height: 100%;
    background-color: #49607c;
    left: 0;
    align-items: center;
    box-sizing: border-box;
    transition: 0.1s;
    ${(props : any) => props.open ? 
        css`
            padding: 8px 30px;
        ` : css`
            padding: 8px 0px;
        `
    }
`;

export const NavSideDataLi = styled.li`
    list-style-type : none;
`;

export const NavSideA = styled.a`
    display: flex;
    padding: 14px 8px 6px 8px;
    text-decoration: none;
    font-size: 15px;
    display: block;
    transition: 0.1s;
    &:hover{
        color: #778899;
    }
    ${(props : any) => props.open && css`
        padding: 14px 0px 6px 0px;
    `}
`;

export const NavSideSpan = styled.span`
    transition: 0.1s;
    ${(props : any) => !props.open && css `
            display: none;
        `
    }
`;
import styled from "styled-components";

export const NavSideDiv = styled.div`
    position: fixed;
    //z-index: 1;
    height: 100%;
    background-color: #49607c;
    left: 0;
    align-items: center;
    padding: 8px 20px;
    box-sizing: border-box;
`;

export const NavSideA = styled.a`
    &:hover{
        color: #778899;
    }
    padding: 14px 8px 6px 8px;
    text-decoration: none;
    font-size: 15px;
    display: block;
`;


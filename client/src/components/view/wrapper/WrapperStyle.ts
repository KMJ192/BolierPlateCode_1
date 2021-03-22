import styled, { css } from "styled-components";

export const ToggleBtn = styled.div`
    opacity: 0;
    position: absolute;
    font-size: 40px;
    ${(props : any) => props.open ? 
        css`
            margin-left: 110px;
        ` : css`
            margin-left: 45px;
        `
    }
    &:hover{
        transition: 0.15s all ease-in;
        opacity: 0.15;
    }
`;

export const LandingScreen = styled.main`
    transition: 0.5s;
    ${(props : any) => props.open ? css`    
        margin-left: 110px;
    ` : css`
        margin-left: 50px; 
    `}
`;


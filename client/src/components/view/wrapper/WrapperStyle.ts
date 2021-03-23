import styled, { createGlobalStyle, css } from "styled-components";

export const BackGround = createGlobalStyle`
body{
  background: #0A0A0A;
}
`;

export const ToggleBtn = styled.div`
    opacity: 0;
    position: absolute;
    font-size: 40px;
    color: #FFFFFF;
    ${(props : any) => props.open ? 
        css`
            margin-left: 130px;
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
        margin-left: 130px;
    ` : css`
        margin-left: 45px; 
    `}
`;


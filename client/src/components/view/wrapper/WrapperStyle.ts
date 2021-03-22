import styled, { css } from "styled-components";

export const SidebarContainer = styled.div`
    ${(props : any) => props.open ?  
        css`
            display: block;
        ` : css`
            display: none;
        `
    }
`;

export const ToggleBtn = styled.div`
    opacity: 0.01;
    position: absolute;
    font-size: 50px;
    ${(props : any) => props.open ? 
        css`
            margin-left: 130px;
        ` : css`
            margin-left: 10px;
        `
    }
    &:hover{
        transition: 0.15s all ease-in;
        opacity: 0.15;
    }
`;

export const LandingScreen = styled.main`
    ${(props : any) => props.open && css`
        transition: 0.125s all ease-in;
        margin-left: 130px;
    `}
`;


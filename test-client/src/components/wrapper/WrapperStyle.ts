import styled, { css } from "styled-components";

export const ToggleBtn = styled.div`
    ${(props : any) => props.toggle ? 
        css`
            margin-left: 150px;
        ` : css`
            margin-left: 40px;
        `
    }
`;

export const Main = styled.main`
    ${(props : any) => props.toggle ? css`    
        margin-left: 150px;
    ` : css`
        margin-left: 40px;
    `}
`;
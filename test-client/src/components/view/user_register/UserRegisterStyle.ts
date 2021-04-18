import styled, { css } from "styled-components";

export const ResultMsg = styled.div`
    ${(props : any) => props.font 
        ?
        css`color: green;`
        :
        css`color: red;`
    }
`;
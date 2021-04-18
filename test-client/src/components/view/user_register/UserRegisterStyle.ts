import styled, { css } from "styled-components";

export const ResultMsg = styled.div`
    ${(props : any) => props.result 
        ?
        css`color: green;`
        :
        css`color: red;`
    }
`;
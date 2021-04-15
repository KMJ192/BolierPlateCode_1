import styled, { css } from "styled-components";

export const A = styled.a`
    ${(props : any) => props.toggle ?
        css`
            padding: 14px 50px 6px 20px;
        `: css`
            padding: 0px 7px 0px 1px;
        `
    }
`;

export const Span = styled.span`
    ${(props : any) => !props.toggle && css`display: none`}
`;
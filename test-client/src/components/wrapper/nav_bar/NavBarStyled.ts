import styled, { css } from "styled-components";

//navbar flex-direction : column;
export const Div = styled.nav`
    @media screen and (max-width: 768px) {
        ${(props : any) => props.toggle ?
            css`` : css`display: none;`
        }
    }
`;
export const Ul = styled.ul`
    @media screen and (max-width: 768px) {
        ${(props : any) => props.toggle ?
            css`` : css`display: none;`
        }
    }
`;

//유저 드랍다운박스 토글
export const UserDropdown = styled.div`
    ${(props : any) => !props.toggle && css`display: none;`}
`;
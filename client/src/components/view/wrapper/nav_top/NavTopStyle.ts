import styled, { css } from 'styled-components';

export const NavBar = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #263343;
    padding: 8px 12px;
    box-shadow: 1px 0px 5px 1px gray;
    @media screen and (max-width: 768px){
        flex-direction: column;
        align-items: flex-start;
    }
`;

export const LogoContainer = styled.div`
    font-size: 15px;
    padding: 8px 12px;
`;

export const MenuUl = styled.ul`
    display: flex;
    list-style: none;
    margin-left: 40px;
    position: absolute;
    @media screen and (max-width: 768px){
        ${(props : any) => props.open ? 
            css`
                display: flex;
            ` : css`
                display: none;
            `
        }
        flex-direction: column;
        text-align: center;
        width: 100%;
        position: static;
        margin-left: 0px;
        padding-left: 0;
    }
`;
export const MenuLi = styled.li`
    font-size: 15px;
    padding: 8px 0px 8px 15px;
    @media screen and (max-width: 768px){
        transition: 0.3s;
        &:hover{
            background-color: #d49466;
        }
        border-radius: 4px;
    }
`;
export const MenuA = styled.a`
    transition: 0.1s;
    &:hover{
        color: #778899;
    }
`;

//검색창
export const SearchContainer = styled.form`
    display: flex;
    margin-left: 120px;
    @media screen and (max-width: 768px){
        align-items: center;
        text-align: center;
        margin: 0 auto;
        margin-top:15px;
    }
`;
export const SearchBox = styled.input`
    padding-left: 5px;
    border-radius: 5px;
    width: 400px;
    height: 25px;
    box-shadow: 4px 4px 5px 1px gray inset;
`;
export const SearchButton = styled.button`
    height: 30px;
`;

export const UserOption = styled.div`
    @media screen and (max-width: 768px){
        display: none;
    }
`;
export const UserDataErea = styled.div`
    display: flex;
    align-items: center;
    font-size: 15px;
`;
export const UserInfo = styled.div`
    color: white;
    margin-left: 200px;
`;

//로그인, 회원가입버튼
export const UserButton = styled.button`
    height:30px;
    @media screen and (max-width: 768px){
        margin-top:15px;
    }
`;

//nav bar의 토글버튼
export const NavToggle = styled.a`
    position: absolute;
    right: 15px;
    top: 12px;
    display: none;
    size: 15px;
    @media screen and (max-width: 768px){
        display: block;
    }
`;
export const CircleButton = styled.button`
    background:#898685;
    &:hover{
        background: #63e6be;
    }
    &:active{
        background: #20c997;
    }
    // z-index: 5;
    cursor: pointer;
    width: 30px;
    height: 30px;

    display: flex;
    align-items: center;

    font-size: 30px;
    color: white;
    border-radius: 40px;
    border: none;
    outline: none;

    transition: 0.125s all ease-in;
    ${(props : any) => props.open && css`
            background: #ff6b6b;
            &:hover{
                background: #ff8787;
            }
            &:active{
                background: #fa5252;
            }
            transform: rotate(45deg);
        `
    }
`;

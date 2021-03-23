import styled from "styled-components";

export const LoginMainScreen = styled.div`
    background-color: #898685;
    width: 100%;
    heigth: 100%;
    padding-top: 10px;
    padding-bottom: 23px;
`;

export const LoginForm = styled.div`
    width: 512px;
    height: 608px;
    position: relative;
    background: #E7EAFE;
    border-radius: 16px;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.4);
    margin: 0 auto;
    margin-top: 146px;
    margin-bottom: 182px;
    display: flex;
    flex-direction: column;
`;

export const Form = styled.form`
    text-align: center;
    margin-top: 70px;
`;

export const Input = styled.input`
    margin-top: 10px;
    padding: 10px 0px 10px 10px;
    width: 300px;
    font-size: 15px;
    outline-color: #6B7FFF;
    &:focus{
        box-shadow: 0 0 20px rgba(0, 60, 180, 0.6);
    }
`;

export const LoginButton = styled.button`
    width: 190px;
    height: 40px;
    font-size: 20px;
    margin-top: 5px;
`;

export const MoveUserRegisterPage = styled.button`
    width: 115px;
    height: 40px;
    font-size: 20px;
    margin-top: 5px;
    margin-left: 10px;
`;

export const MoveMainPage = styled.button`
    width: 315px;
    height: 40px;
    font-size: 20px;
    margin-top: 10px;
`;
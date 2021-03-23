import styled from "styled-components";

export const UserRegisterMainScreen = styled.div`
    background-color: #898685;
    padding-top: 10px;
    padding-bottom: 103px;
`;

export const UserRegisterForm = styled.div`
    background: #E7EAFE;
    width: 512px;
    height: 728px;
    margin: 0 auto;
    margin-top: 96px;
    margin-bottom: 32px;
    border-radius: 16px;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.4);
    display: flex;
    flex-direction: column;
`;

export const Form = styled.form`
    text-align: center;
    margin-top: 35px;
    left: 50%;
`;

export const UserImagePlace = styled.img`
    background: #C3C3C3;
    width: 110px;
    height: 130px;
    margin: 5px 0px 10px 0px;
    border-radius: 7px;
`;

export const UserImageLabel = styled.label`
    background-color: #25D8FF;
    padding: 7px 15px 7px 15px;
    border-radius: 5px;
    color: white;
    transition: 0.125s all ease-in;
    &:hover{
        background-color: #00A7CB;
    }
`;

export const InputDelimiter = styled.input`
    margin-top: 10px;
    padding: 10px 0px 10px 10px;
    width: 223px;
    font-size: 15px;
    outline-color: #6B7FFF;
    &:focus{
        box-shadow: 0 0 20px rgba(0, 60, 180, 0.6);
    }
`;

export const InputPassword = styled.input`
    margin-top: 10px;
    padding: 10px 0px 10px 10px;
    width: 300px;
    font-size: 15px;
    outline-color: #6B7FFF;
    &:focus{
        box-shadow: 0 0 20px rgba(0, 60, 180, 0.6);
    }
`;

export const ConfirmDupButton = styled.button`
    margin-left: 7px;
    height: 41px;
    width: 70px;
`;

export const UserRegisterButton = styled.button`
    width: 310px;
    height: 40px;
    font-size: 20px;
    margin-top: 20px;
`;
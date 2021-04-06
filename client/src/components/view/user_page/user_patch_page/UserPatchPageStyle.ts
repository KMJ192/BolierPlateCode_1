import styled from "styled-components";

export const Header = styled.div`
    font-size: 30px;
    margin-left: 100px;
`;

export const UserPatchContainer = styled.div`
    background: #FDFDFD;
    width: 500px;
    height: 680px;
    margin-left: 70px;
    margin-top: 20px;
    border-radius: 16px;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.4);
    display: flex;
    flex-direction: column;
    text-align: center;
`;

export const Form = styled.form`
    text-align: center;
    margin-top: 35px;
    left: 50%;
`;

export const UserImagePlace = styled.img`
    background: #C3C3C3;
    width: 100px;
    height: 100px;
    margin: 5px 0px 10px 0px;
    border-radius: 50%;
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

export const UserEmail = styled.input`
    margin-top: 10px;
    padding: 10px 0px 10px 10px;
    width: 300px;
    font-size: 15px;
    outline-color: #6B7FFF;
`;

export const UserNickname = styled.input`
    margin-top: 10px;
    padding: 10px 0px 10px 10px;
    width: 223px;
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

export const UserPatchButton = styled.button`
    width: 315px;
    height: 40px;
    font-size: 20px;
    margin-top: 10px;
`;
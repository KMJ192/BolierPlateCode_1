import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux_module/RootReducer';
import './NavTop.css';
import { login_page, main_page, user_register_page } from '../../../../info_manage/page_url';
import { 
    NavBar,
    LogoContainer,
    MenuUl,
    MenuLi,
    MenuA,
    SearchContainer, 
    SearchBox,
    SearchButton,
    UserButton,
    UserOption,
    NavToggle, 
    CircleButton, 
} from './NavTopStyle';
import { NavTopData } from './NavTopData';
import NavTopUserOption from './NavTopUserOption';

function NavTop() {
    const [open, setOpen] = useState(false);
    const onToggle = () => setOpen(!open);
    const { data, loading } = useSelector((state : RootState) => state.user.userProfile);
    return (
        <NavBar>
            <LogoContainer>
                <a href={main_page}>
                    <i className="fab fa-rust logo"></i>
                    logo
                </a>
            </LogoContainer>
            <MenuUl open={open} {...open}>
                {NavTopData.map((item, index) => {
                    return (
                        <MenuLi key={index}>
                            <MenuA href={item.path}>
                                {item.title}
                            </MenuA>
                        </MenuLi>
                    );
                })}
                <SearchContainer>
                    <SearchBox/>
                    <SearchButton>search</SearchButton>
                </SearchContainer>
            </MenuUl>
            <UserOption>
                {data?.useremail ? 
                        <NavTopUserOption 
                            useremail={data.useremail} 
                            nickname={data.nickname} 
                            user_image={data?.userimage}
                        />
                    :
                    <div>
                        <a href={login_page}><UserButton>로그인</UserButton></a>
                        <a href={user_register_page}><UserButton>회원가입</UserButton></a>
                    </div>
                }
            </UserOption>
            <NavToggle>
                <CircleButton onClick={onToggle} open={open} {...open}>+</CircleButton>
            </NavToggle>
        </NavBar>
    );
}

export default NavTop;
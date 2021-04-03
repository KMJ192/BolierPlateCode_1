import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import useLocalStorage from '../../../custom_hook/useLocalStorage';
import { RootState } from '../../../redux_module/RootReducer';
import { getUserThunk } from '../../../redux_module/user';
import NavSide from './nav_side/NavSide';
import NavTop from './nav_top/NavTop'
import { LandingScreen, ToggleBtn } from './WrapperStyle';

interface Props{
    children : React.ReactNode;
}

function Wrapper({ children } : Props){
    const { data, loading, error } = useSelector((state : RootState) => state.user.userProfile)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUserThunk());
    }, []);
    
    const [sidebarState, setSidebarState] = useLocalStorage('sidebarToggle', true);
    const sidebarToggle = () =>{
        setSidebarState(!sidebarState);
    };
    return(
        <div>
            <NavTop email={data?.useremail} nickname={data?.nickname} userimage={data?.userimage}/>
            <ToggleBtn onClick={sidebarToggle} open={sidebarState} {...sidebarState}>
                {sidebarState ? 
                    <i className="fas fa-arrow-alt-circle-left"></i>
                    :
                    <i className="fas fa-arrow-alt-circle-right"></i>
                }
            </ToggleBtn>
            <NavSide open={sidebarState}/>
            <LandingScreen open={sidebarState} {...sidebarState}>
                {loading ? <div>...로딩중</div> : children}
            </LandingScreen>
        </div>
    );
}

export default Wrapper;
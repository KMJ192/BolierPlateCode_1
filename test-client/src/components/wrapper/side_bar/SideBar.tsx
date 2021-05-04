import React from 'react';
import './SideBar.scss';
import { SideBarMenuList } from './SideBarMenuList';
import { A, Span } from './SideBarStyle';

interface Props{
    toggle : boolean;
}

function SideBar({ toggle } : Props) {
    return (
        <div className="side-bar">
            {SideBarMenuList.map((item, index) => {
                return(
                    <li key={index}>
                        <A href={item.path} toggle={toggle} {...toggle}>
                            {item.icon}
                            <Span toggle={toggle} {...toggle}>
                                {item.title}
                            </Span>
                        </A>
                    </li>
                )
            })}
        </div>
    )
}

export default React.memo(SideBar)

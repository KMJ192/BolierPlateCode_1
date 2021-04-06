import React from 'react';
import { UserImage } from '../../../../image/Images';
import { server_url } from '../../../../info_manage/server_url';
import { UserImageArea } from './NavTopUserOptionStyled';
interface Props{
    user_image : string;
}
function NavTopUserOption({ user_image } : Props) {
    return (
        <div>
            {user_image ? 
                <UserImageArea src={server_url + "/uimg/" + user_image} alt="user"/>
                :
                <UserImageArea src={UserImage}/>
            }
        </div>
    )
}

export default React.memo(NavTopUserOption);
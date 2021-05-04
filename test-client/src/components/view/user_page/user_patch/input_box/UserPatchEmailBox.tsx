import React from 'react';
interface Props{
    useremail : string
}
function UserPatchEmailBox({ useremail } : Props) {

    return (
        <div className="email-container">
            <label htmlFor="email-box">이메일</label>
            <br/>
            <input 
                id="email-box"
                className="input-box user-patch"
                type="text"
                placeholder={useremail}
                readOnly
            />
        </div>
    )
}

export default React.memo(UserPatchEmailBox);

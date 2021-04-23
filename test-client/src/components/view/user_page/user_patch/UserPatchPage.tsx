import React from 'react';
import Wrapper from '../../../wrapper/Wrapper'

function UserPatchPage() {
    // const [redirect, setRedirect] = useState(false);
    // const UserData = useSelector((state : RootState) => state.user.userProfile);
    // document.title = UserData.data?.nickname + "님 정보 수정";

    // const request = async (formData : FormData) => {
    //     // const response = await axios.post("/patch_user", formData)
    //     //     .then(response => response.data)
    //     //     .catch(err => err);
    //     // console.log(response);
    //     // if(response.data.patch === true){
    //     //     alert("수정이 완료되었습니다.")
    //     //     setRedirect(true);
    //     //     return;
    //     // }
    //     //alert("오류가 발생했습니다. " + response);
    // };
    

    return (
        <Wrapper>
            {/* <UserPage
                pageName="UserPatch"
                formTitle={UserData.data?.nickname + "님 정보 수정"} 
                email={String(UserData.data?.useremail)}
                userNickname={String(UserData.data?.nickname)}
                buttonValue="수정하기"
                requestFunction={request}
            /> */}
        </Wrapper>
    );
}

export default UserPatchPage

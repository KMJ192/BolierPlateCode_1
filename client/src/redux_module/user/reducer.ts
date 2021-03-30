//1. action 선언
const USEREMAIL = 'USEREMAIL' as const;
const USERNICKNAME = 'USERNICKNAME' as const;
const USERIMAGE = 'USERIMAGE' as const;

//2. action 생성함수 선언
export const userEmail = () => ({type: USEREMAIL});
export const userNickname = () => ({type : USERNICKNAME});
export const userImage = () => ({type : USERIMAGE});

//3. 초기상태설정
interface UserState{
    userEmail: string;
    userNickname: string;
    userImage: string;
};
const initialState: UserState = {
    userEmail: "",
    userNickname: "",
    userImage: ""
}
//4. action 타입 선언
type UserAction = 
    ReturnType<typeof userEmail> |
    ReturnType<typeof userNickname> |
    ReturnType<typeof userImage>

//5. reducer작성
// function UserReducer(state: UserState = initialState, action: UserAction): UserState{
    
// }
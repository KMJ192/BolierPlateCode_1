//1. action 선언
const GETUSER = 'GETUSER' as const;

//2. action 생성함수 선언
export const getUser = () => ({
    type: GETUSER,
    data:{
        email: "",
        nickname: "",
        image: ""
    }
});
//3. 초기상태설정
interface UserState{
    email: string;
    nickname: string;
    image: string;
}
const initialUserState: UserState = {
    email: "",
    nickname: "",
    image: ""
}
//4. action 타입 선언

//5. reducer작성
// function UserReducer(state: UserState = initialState, action: UserAction): UserState{
    
// }
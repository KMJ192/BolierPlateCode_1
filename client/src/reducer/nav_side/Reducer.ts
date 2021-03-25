//1. action type 선언
const TOGGLE = 'TOGGLE' as const;
//2. action 생성함수 선언
export const toggle = () => ({type: TOGGLE});

//3. 초기상태설정
interface ToggleState{
    toggle: boolean;
};
const initialState = {
    toggle: true
};

//4. action타입 선언
type ToggleAction = ReturnType<typeof toggle>;

//5. reducer 작성
function ToggleReducer(state: ToggleState = initialState, action: ToggleAction){
    switch(action.type){
        case TOGGLE:
            return {
                state: !state.toggle
            };
        default:
            return {
                state: state.toggle
            };
    }
}

export default ToggleReducer;
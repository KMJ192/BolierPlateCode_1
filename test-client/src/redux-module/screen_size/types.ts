import { screenResize } from "./action";

//2. action type 생성
export type ScreenSizeAction = ReturnType<typeof screenResize>
export type ScreenSizeState = {
    width : number;
    height : number;
}

//3. intialize
export const InitialScreenSize = {
    width : window.innerWidth,
    height : window.innerHeight
}

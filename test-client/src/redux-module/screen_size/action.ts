//1. action 정의
export const RESIZE = 'RESIZE';

export const screenResize = (width : number, height : number) => ({
    type : RESIZE,
    screenWidth : width,
    screenHeight : height
});
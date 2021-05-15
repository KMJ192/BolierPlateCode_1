import { useDispatch } from "react-redux";
import { getUserThunk } from "../redux-module/user";

export function GetUser() {
    const getUserDispatch = useDispatch();
    getUserDispatch(getUserThunk());
}

// export function GetScreenSize() {
//     const getScreenSizeDispatch = useDispatch();
//     // getScreenSizeDispatch({
//     //     width : window.innerWidth,
//     //     height : window.innerHeight
//     // });
//     const handleResize = () => {
//         if(window.innerWidth < 461){
//             console.log(`x ${window.innerWidth}, ${window.innerHeight}`);
//         }
//     };
//     // window.addEventListener('resize', handleResize);
//     // window.removeEventListener('resize', handleResize);
// }
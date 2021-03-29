import axios from "axios";

export async function ReqServerJSON(param: string, reqData: Object, deli: number){
    let res: Object ={};
    if(deli === 0){
        await axios.get(param)
            .then((response) => {
                res = response.data;
            }).catch((err) => {
                alert("오류발생 : " + err);
                res = {error: true};
            });
    }else if(deli === 1){
        await axios.post(param, reqData)
            .then((response) => {
                res = response.data;
            }).catch((err) => {
                alert("오류발생 : " + err);
                res = {error: true};
            });
    }else if(deli === 2){
        await axios.patch(param, reqData)
            .then((response) => {
                res = response.data;
            }).catch((err) => {
                alert("오류발생 : " + err);
                res = {error: true};
            });
    }else if(deli === 3){
        await axios.delete(param, reqData)
            .then((response) => {
                res = response.data;
            }).catch((err) => {
                alert("오류발생 : " + err);
                res = {error: true};
            });
    }
    return res;
}

//이메일 폼, 비밀번호 폼 추출
export function ConfirmUserForm(asValue: string, delimiter: number) {
    let regExp: RegExp = /^/;
    if(delimiter === 0){
        regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    }else{
        regExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,25}$/
    }
    return regExp.test(asValue); // 형식에 맞는 경우 true 리턴
}
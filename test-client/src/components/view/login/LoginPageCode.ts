import axios, { AxiosResponse } from "axios";

export async function LoginRequest(loginData : Object) {
    const response = await axios.post('/login', loginData)
        .then((response : AxiosResponse<any>) => response.data)
        .catch((err : any) => {
            alert("오류가 발생했습니다. 오류내용 : " + err);
        });

    if(response["login"] === true) return true;
    else{
        if(response["message"] === "E-P-00") 
            alert("비밀번호가 틀렸습니다.");
        else if(response["message"] === "E-P-01") 
            alert("등록된 이메일이 아닙니다.");
    }

    return false;
}
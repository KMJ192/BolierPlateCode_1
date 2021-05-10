import axios from "axios";

export async function LoginRequest(loginData : Object){
    const response = await axios.post('/login', loginData)
        .then(response => response.data)
        .catch(err => {
            alert("오류가 발생했습니다. 오류내용 : " + err);
        });
    
    if(response["login"] === true) {
        return true;
    }

    if(response["message"] === "Different pw") {
        alert("비밀번호가 틀렸습니다.");
        return false;
    }

    if(response["message"] === "None email") {
        alert("등록된 이메일이 아닙니다.");
        return false;
    }

    alert("알수 없는 오류가 발생했습니다.");
    return false;
}
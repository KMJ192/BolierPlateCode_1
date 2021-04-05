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
import { Injectable } from '@nestjs/common';

const bcrypt = require("bcrypt");

let db_config = require("../db_connect/db_connect");
let conn = db_config.init();

//비동기처리가 되어있어서 그런것 같은데 DB연결이 완료된 다음 return하도록 하게 방법을 찾아야 된다.
//function을 return 시키는 방법 찾아봐야 될듯
@Injectable()
export class UserService {
    //User login
    async getUser(body : JSON){
        let resultMsg : string;
        let sFlag : boolean = false;
        //1. 입력받은 email의 존재 유무 파악
        let sql : string = "select EXISTS (select password from test.users where email='" + body["email"] + "') as success";
        const emailExists = await SQLQueryRun(sql);
        if(emailExists[0]["success"]== 1){
            //2. password 일치여부 파악
            sql = "select password from test.users where email='" + body["email"] + "'";
            const dbPw = await SQLQueryRun(sql);
            const match = await bcrypt.compareSync(body["password"], dbPw[0]["password"]);
            if(match){
                //3. token 생성
                sFlag = true;
                resultMsg = "token생성하기"
            }else{
                resultMsg = "Different pw";
            }
        }else{
            resultMsg = "Dose not exist email";
        }
        return {
            login : sFlag,
            message : resultMsg
        };
    }
    
    //User 가입
    async createUser(userData : JSON){
        //1. 입력받은 email이 DB에 있는지 파악
        let sql : string = "select EXISTS (select password from test.users where email='" + userData["email"] + "') as success";
        const emailExists = await SQLQueryRun(sql);
        if(emailExists[0]["success"] == 0){
            //2. 입력받은 email이 DB에 없을 경우 DB에 Input
            //encryption password => parameter plain password, SaltRound
            const hashedPassword = await bcrypt.hash(userData["password"], 10);
            sql = "insert into test.users value('" + userData["email"] + "', '" + hashedPassword + "', '" + userData["name"]+ "', '" + userData["user_image"] + "', '', " + userData["token_exp"] + ", '" + userData["user_rol"] + "', '" + NowTime() + "', '" + userData["created_by"] + "', '" + NowTime() + "', '" + userData["updated_by"] + "')";
            return SQLQueryRun(sql);
        }else{
            //3. 입력받은 email이 있을 경우 결과 발송
            return {
                registerd : false,
                message : "중복된 이메일"
            }
        }
    }

    //User 삭제
    async deleteUser(body : JSON){
        //삭제 query
        let sql : string = "delete from test.users where email='" + body["email"] + "'";
        const result = await SQLQueryRun(sql);
        return result;
    }

    //User 내용수정
    async patchUser(body : JSON){
        //수정 query 작성 
        let sql : string = "update test.users set name='" + body["name"] + "', updated_at='" + NowTime() + "' where email='" + body["email"] + "'";
        const result = await SQLQueryRun(sql);
        return result;
    }
    
    //테스트용 Method
    async dbTest(userData : JSON){
        //여기에 return logic 작성
        return userData;
    }
}

//SQL Query 실행
function SQLQueryRun(sql : string) {
    return new Promise((resolve, reject) => {
        conn.query(sql, function(err, result){
            if(err){
                reject(err);
            }
            resolve(result);
        });
    });
}

function NowTime() : string{
    let dateTime = new Date();
    let temp : string = String(dateTime.getFullYear());
    //month 길이
    if(String(dateTime.getMonth()).length == 1){
        temp = temp + "/0" + String(dateTime.getMonth());
    }else{
        temp = temp + "/" + String(dateTime.getMonth());
    }

    //day길이
    if(String(dateTime.getDate()).length == 1){
        temp = temp + "/0" + String(dateTime.getDate());
    }else{
        temp = temp + "/" + String(dateTime.getDate());
    }

    //hour 길이
    if(String(dateTime.getHours()).length == 1){
        temp = temp + " 0" + String(dateTime.getHours());
    }else{
        temp = temp + " " + String(dateTime.getHours());
    }

    //minute 길이
    if(String(dateTime.getMinutes()).length == 1){
        temp = temp +  ":0" + String(dateTime.getMinutes());
    }else{
        temp = temp + ":" + String(dateTime.getMinutes());
    }

    //second 길이
    if(String(dateTime.getSeconds()).length == 1){
        temp = temp + ":0" + String(dateTime.getSeconds());
    }else{
        temp = temp + ":" + String(dateTime.getSeconds());
    }

    temp = temp + ":" + String(dateTime.getMilliseconds());

    return temp;
}

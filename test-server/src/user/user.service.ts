import { Injectable, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { rejects } from 'assert';
import e, { Response, Request } from 'express';
import { resolve } from 'path';
import { switching } from '../switch/switch';

const bcrypt = require("bcrypt");

let db_config = require("../database/db_connect");
let conn = db_config.init();

@Injectable()
export class UserService {
    constructor(private jwtService : JwtService){}
    
    //User SignUp
    async RegisterUser(userData : JSON){
        let resultMsg : string;
        let sFlag : boolean = false;
        //1. 입력받은 email이 DB에 있는지 파악
        let sql : string = "select EXISTS (select password from " + switching + ".users where email='" + userData["email"] + "') as success";
        const emailExists = await SQLQueryRun(sql);
        if(emailExists[0]["success"] == 0){
            //2. 입력받은 email이 DB에 없을 경우 DB에 Input -> encryption password => parameter plain password, SaltRound
            const hashedPassword = await bcrypt.hash(userData["password"], 10);
            sql = "insert into " + switching + ".users value('" + userData["email"] + "', '" + hashedPassword + "', '" + userData["name"]+ "', '" + userData["user_image"] + "', '" + userData["user_rol"] + "', '" + NowTime() + "', '" + userData["created_by"] + "', '" + NowTime() + "', '" + userData["updated_by"] + "')";
            SQLQueryRun(sql);
            sFlag = true;
            resultMsg = "Signup success"
        }else{
            //3. 입력받은 email이 있을 경우 결과 발송
            sFlag = false;
            resultMsg = "Duplicated email";
        }
        return {
            registerd : sFlag,
            message : resultMsg
        };
    }

    //User Login
    async Login(email : string, password : string, response : Response){
        let resultMsg : string;
        let sFlag : boolean = false;
        //1. 입력받은 email의 존재 유무 파악
        let sql : string = "select EXISTS (select password from " + switching + ".users where email='" + email + "') as success";
        const emailExists = await SQLQueryRun(sql);

        if(emailExists[0]["success"]== 1){
            //2. password 일치여부 파악
            sql = "select password from " + switching + ".users where email='" + email + "'";
            const dbPw = await SQLQueryRun(sql);
            const match = await bcrypt.compareSync(password, dbPw[0]["password"]);
            if(match){
                //password까지 일치할 경우 token 생성 및 로그인 완료
                //Json Web Token을 이용하여 token 생성
                const jwt = await this.jwtService.signAsync({
                    id : email
                });
                response.cookie('jwt', jwt, {httpOnly : true});

                sFlag = true;
                resultMsg = "Login success"
            }else{
                resultMsg = "Different pw";
            }
        }else{
            resultMsg = "None email";
        }
        
        return {
            login : sFlag,
            message : resultMsg
        };
    }

    //User Verify
    async ConfirmUser(request : Request){
        const cookie = await request.cookies['jwt'];
        return this.jwtService.verifyAsync(cookie);
    }

    //Logout
    Logout(response : Response){
        response.clearCookie('jwt')
        return {
            message : "success"
        };
    }

    //User delete
    async DeleteUser(body : JSON){
        //삭제 query
        let sql : string = "delete from " + switching + ".users where email='" + body["email"] + "'";
        const result = await SQLQueryRun(sql);
        return result;
    }

    //User patch
    async PatchUser(body : JSON){
        //수정 query 작성
        let sql : string = "update " + switching + ".users set name='" + body["name"] + "', updated_at='" + NowTime() + "' where email='" + body["email"] + "'";
        const result = await SQLQueryRun(sql);
        return result;
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
    });;
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

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
import { switching } from '../switch/switch';

const bcrypt = require("bcrypt");

let db_config = require("../database/db_connect");
let conn = db_config.init();

@Injectable()
export class UserService {
    constructor(private jwtService : JwtService){}
    
    //User SignUp
    async RegisterUser(userData : JSON, user_image : string){
        let resultMsg : string;
        let sFlag : boolean = false;
        if(userData["user_rol"] == 0){
            //1. 입력받은 email과 중복된 email이 DB에 있는지 확인
            let sql : string = "select EXISTS (select password from " + switching + ".users where email='" + userData["email"] + "') as success";
            const emailExists = await SQLQueryRun(sql);
            if(emailExists[0]["success"] == 0){
                //2. 입력받은 name과 중복된 name이 DB에 있는지 확인
                sql = "select EXISTS (select password from " + switching + ".users where name='" + userData["name"] + "') as success"
                const dupUsername = await SQLQueryRun(sql);
                if(dupUsername[0]["success"] == 0){
                    //3. email과 name이 중복되지 않았을 경우 DB에 Input -> encryption password => parameter plain password, SaltRound
                    const hashedPassword = await bcrypt.hash(userData["password"], 10);
                    //user_image의 경로를 저장
                    sql = "insert into " + switching + ".users value('" + userData["email"] + "', '" + hashedPassword + "', '" + userData["name"]+ "', '" + user_image + "', '" + userData["user_rol"] + "', '" + NowTime() + "', '" + userData["created_by"] + "', '" + NowTime() + "', '" + userData["updated_by"] + "')";
                    SQLQueryRun(sql);
                    sFlag = true;
                    resultMsg = "Signup success";
                }else{
                    sFlag = false;
                    resultMsg = "Duplicated name";
                }
            }else{
                //3. 입력받은 email이 있을 경우 결과 발송
                sFlag = false;
                resultMsg = "Duplicated email";
            }
        }else{
            //유저롤이 잘못된값으로 입력될 경우 가입 제한
            sFlag = false;
            resultMsg = "User rol error";
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
        if(emailExists[0]["success"] == 1){
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
        let email : string;
        let verifed : boolean;
        let username : string, userimage : string;

        if(request["cookies"]["jwt"] == null){
            //Token이 없음
            verifed = false;
        }else{
            //Token이 있음
            try{
                let sql : string;
                let user_data;
                
                //유저닉네임 추출
                const cookie = await request.cookies['jwt'];
                //쿠키 비교
                await this.jwtService.verifyAsync(cookie).then(value => {
                    email = value["id"];
                });
                
                sql = "select name, user_image from " + switching + ".users where email='" + email + "'";
                user_data = await SQLQueryRun(sql);
        
                //email에 대한 유저닉네임 추출
                username = user_data[0]["name"];
                userimage = user_data[0]["user_image"];
                verifed = true;
            }catch(e){
                verifed = false;
            }
        }
        return {
            useremail : email,
            username : username,
            userimage : userimage,
            result : verifed
        };
    }

    //Logout
    Logout(response : Response){
        response.clearCookie('jwt')
        return {
            message : "success"
        };
    }

    //User delete
    async DeleteUser(email : string){
        //삭제 query
        let sql : string = "delete from " + switching + ".users where email='" + email + "'";
        const result = await SQLQueryRun(sql);
        return result;
    }

    //User patch
    async PatchUser(userData : JSON, user_image : string){
        //수정 query 작성
        let sql : string = "select EXISTS (select password from " + switching + ".users where name='" + userData["name"] + "') as success"
        let resultMsg : string;
        let sFlag : boolean = false;
        const dupUsername = await SQLQueryRun(sql);
        if(dupUsername[0]["success"] == 0){
            //입력된 유저 이름이 중복되어 있지 않으면 수정
            if(user_image == ""){
                sql = "update " + switching + ".users set name='" + userData["name"] + "', updated_at='" + NowTime() + "' where email='" + userData["email"] + "'";
            }else{
                sql = "update " + switching + ".users set name='" + userData["name"] + "', user_image='" + user_image + "',updated_at='" + NowTime() + "' where email='" + userData["email"] + "'";
            }
            await SQLQueryRun(sql);
            resultMsg = "Patch success"
            sFlag = true;
        }else{
            resultMsg = "Duplicated name";
        }
        return {
            patch : sFlag,
            message : resultMsg
        };
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

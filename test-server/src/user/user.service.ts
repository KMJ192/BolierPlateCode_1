import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
import { NowTime } from 'src/function/NowTime';
import { switching } from '../switch/switch';

const bcrypt = require("bcrypt");

let db_config = require("../database/db_connect");
let conn = db_config.init();

@Injectable()
export class UserService {
    constructor(private jwtService : JwtService){}
    
    //User SignUp
    //email, nickname중복 확인 logic 추가
    async RegisterUser(userData : JSON, user_image : string){
        let resultMsg : string;
        let sFlag : boolean = false;
        if(userData["user_rol"] == 0){
            const hashedPassword = await bcrypt.hash(userData["password"], 10);
            const sql : string = "insert into " + switching + ".users value('" + userData["email"] + "', '" + hashedPassword + "', '" + userData["nickname"]+ "', '" + user_image + "', '" + userData["user_rol"] + "', '" + NowTime() + "', '" + userData["created_by"] + "', '" + NowTime() + "', '" + userData["updated_by"] + "')";
            const result = await SQLQueryRun(sql);
            if(result["protocol41"] == true){
                sFlag = true;
                resultMsg = "Signup success";
            }else{
                resultMsg = "error"
            }
        }else{
            //유저롤이 잘못된값으로 입력될 경우 가입 제한
            resultMsg = "User rol error"; 
        }
        return {
            result : sFlag,
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
                resultMsg = "success"
            }else{
                //비밀번호가 다름
                resultMsg = "E-P-00";
            }
        }else{
            //이메일이 없음
            resultMsg = "E-P-01";
        }
        
        return {
            login : sFlag,
            message : resultMsg
        };
    }

    //User Verify
    async ConfirmUser(request : Request){
        let email : string;
        let verifed : boolean = false;
        let username : string, userimage : string;
        let resultMsg : string;
        if(request["cookies"]["jwt"] == null){
            //Token이 없음
            resultMsg = "none jwt"
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
                resultMsg = "success";
                verifed = true;
            }catch(e){
                verifed = false;
                resultMsg = e;
            }
        }
        return {
            useremail : email,
            nickname : username,
            user_image : userimage,
            result : verifed,
            message : resultMsg
        };
    }

    //Logout
    async Logout(response : Response){
        response.clearCookie('jwt');
        return {
            message : "success"
        };
    }

    //User delete
    async DeleteUser(email : string, response : Response){
        //삭제 query
        let sql : string = "delete from " + switching + ".users where email='" + email + "'";
        const result = await SQLQueryRun(sql);
        response.clearCookie('jwt');
        return result;
    }

    //User patch
    async PatchUser(userData : JSON, user_image : string){
        //수정 query 작성
        let resultMsg : string;
        let sFlag : boolean = false;
        let sql : string = "update " + switching + ".users set";
        if(userData["nickname"] != ""){
            sql = sql + " name='" + userData["nickname"] + "',";
        }else if(userData["password"] != ""){
            sql = sql + " password='" + userData["password"] + "',";
        }
        sql = sql + " user_image='" + user_image + "',";
        sql = sql + " updated_at='" + NowTime() + "' where email='" + userData["email"] + "'"; 
        //sql = "update " + switching + ".users set name='" + userData["nickname"] + "', user_image='" + user_image + "',updated_at='" + NowTime() + "' where email='" + userData["email"] + "'";
        await SQLQueryRun(sql);
        resultMsg = "Patch success"
        sFlag = true;
        return {
            patch : sFlag,
            message : resultMsg
        };
    }

    async EmailConfirm(email : string){
        const sql : string = "select EXISTS (select password from " + switching + ".users where email='" + email + "') as success";
        const result = await SQLQueryRun(sql);
        return{
            result : result[0]["success"].toString()
        }
    }

    async NicknameConfirm(nickname : string){
        const sql : string = "select EXISTS (select password from " + switching + ".users where name='" + nickname + "') as success";
        const result = await SQLQueryRun(sql);
        return {
            result : result[0]["success"].toString()
        }
    }
}

//SQL Query 실행
async function SQLQueryRun(sql : string){
    return new Promise((resolve, reject) => {
        conn.query(sql, function(err : string, result){
            if(err){
                reject(err);
            }
            resolve(result);
        });
    });
}
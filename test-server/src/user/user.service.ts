import { Injectable } from '@nestjs/common';

const bcrypt = require('bcrypt');
const saltRounds : number= 10;
//const jwt = require('jsonwebtoken');

let db_config = require("../db_connect/db_connect");
let conn = db_config.init();

//test를 위해 임시로 Global email, password를 설정해놓음
let userEmail : string;
let userPassword : string;

//비동기처리가 되어있어서 그런것 같은데 DB연결이 완료된 다음 return하도록 하게 방법을 찾아야 된다.
//function을 return 시키는 방법 찾아봐야 될듯
@Injectable()
export class UserService {
    
    getUser(body : JSON){
        userEmail = body["email"];
        userPassword = body["password"];
        //1. 입력받은 이메일이 있는지 확인
        let sql : string = "select EXISTS (select password from test.users where email='" + userEmail + "') as success";
        const comPw = new Promise((resolve, reject) => {
            conn.query(sql, function(err : string, result){
                if(err){
                    reject(err);
                }
                resolve(result);
            });
        });

        //2. 입력받은 email이 있는 경우, 해당 Email에 대하여 Password 비교
        sql = "select password from test.users where email='" + userEmail + "'";
        comPw
            .then(result => {
                if(result[0]["success"] != 1) {
                    console.log("email이 없음");
                    return {
                        getUser : false, 
                        message : "등록된 email이 아닙니다."
                    };
                }
                //입력받은 email이 있음
                    conn.query(sql, function(err : string, result) {
                        if(err){
                            return {
                                getUser : false, 
                                message : err
                            }
                        }
                        const match : boolean = bcrypt.compareSync(userPassword, result[0]["password"]);
                        if(!match){
                            //password와 email모두 비교 완료
                            console.log("password가 다르다.");
                            return {
                                getUser : false,
                                message : "password가 다름"
                            };
                        }
                        //3. email에 대한 password가 있을 경우 token 생성
                        //토큰 생성하기위해 email과 생성 시간을 조합하여 token 생성
                        console.log("token 생성해야 된다.");
                        
                        return {
                            getUser : true,
                            message : "성공"
                        };
                    });
                })
                .catch(err => {
                    return {
                        getUser : false,
                        message : err
                    }
                });
    }
    
    createUser(body : JSON){
        //email, password, name, user_image, token, token_exp, user_rol, created_at, created_by, updated_at, updated_by
        userEmail = body["email"];
        userPassword = body["password"];

        let userName : string = body["name"];
        //userImage nullable
        //token nullable
        let token_exp : string = body["token_exp"];
        let userRol : string = body["user_rol"];
        let createdUser : string = body["created_at"];
        let updatedUser : string = body["updated_at"];
        //=받은 password를 암호화=
        //1. salt 생성
        const pwEncrypt = new Promise((resolve, rejects) =>{
            bcrypt.genSalt(saltRounds, function(err : string, salt){
                if(err) {
                    rejects(err);
                }
                resolve(salt);
            });  
        });

        //2. hash 생성
        pwEncrypt
            .then((salt) => {
                bcrypt.hash(userPassword, salt, function(err : string, hash){
                    if(err){
                        return {
                            createSuccess : false,
                            message : err
                        }
                    }
                    //생성된 hash값 password로 입력
                    userPassword = hash;
                    let sql : string = "insert into test.users value('" + userEmail + "', '" + userPassword + "', '" + userName+ "', '', '', " + token_exp + ", '" + userRol + "', '" + NowTime() + "', '" + createdUser + "', '" + NowTime() + "', '" + updatedUser + "')";
                    conn.query(sql, function(err: string){
                        if(err){
                            console.log("유저 생성 실패 : " + err);
                            return {
                                createSuccess : false,
                                message : "가입실패"
                            }
                        }else{
                            console.log("유저 생성 성공");
                            return {
                                createSuccess : true,
                                message : "가입성공"
                            }
                        }});
                    });
                })
                .catch(err => {
                    return {
                        createSuccess : false,
                        message : err
                    }
                });
    }

    deleteUser(body : JSON){
        userEmail = body["email"];
        userPassword = body["password"];

        //삭제 query
        let sql : string = "delete from test.users where email='" + userEmail + "'";
        conn.query(sql, function(err: string){
            if(err){
                console.log("유저 삭제 실패 : " + err);
                return "유저 삭제 실패 : " + err;
            }else{
                console.log("유저 삭제 성공");
                return "User deleted completed";
            }
        });
    }

    patchUser(){
        //수정 query 작성 
        userEmail = "aja2467@google.com"; 
        let sql : string = "update test.users set name='명준', updated_at='" + NowTime() + "' where email='" + userEmail + "'";
        console.log(sql);
        conn.query(sql, function(err: string){
            if(err){
                console.log("유저 수정 실패 : " + err);
                return "유저 수정 실패 : " + err;
            }else{
                console.log("유저 수정 성공");
                return "User patched completed";
            }
        });
    }
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
        temp = temp + "  0" + String(dateTime.getHours());
    }else{
        temp = temp + "  " + String(dateTime.getHours());
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
import { Injectable } from '@nestjs/common';

const bcrypt = require('bcrypt');
const saltRounds : number= 10;
//const jwt = require('jsonwebtoken');

let db_config = require("../db_connect/db_connect");
let conn = db_config.init();

//test를 위해 임시로 Global email, password를 설정해놓음
let g_email : string= "aja2467@google.com";
let g_password : string = "12345";

//비동기처리가 되어있어서 그런것 같은데 DB연결이 완료된 다음 
//function을 return 시키는 방법 찾아봐야 될듯
@Injectable()
export class UserService {

    getUser(){
        //1. 입력받은 이메일과 PW 비교
        let sql : string = "select EXISTS (select password from test.users where email='" + g_email + "') as success";
        const comPw = new Promise((resolve, reject) => {
            conn.query(sql, function(err : string, result){
                if(err){
                    reject(err);
                }
                resolve(result);
            });
        });

        //2. 해당 Email에 대하여 Password 비교
        sql = "select password from test.users where email='" + g_email + "'";
        comPw
            .then(result => {
                if(result[0]["success"] != 1) {
                    console.log("email이 없음");
                    return {
                        getUser : false, 
                        message : "등록된 email이 아닙니다."
                    };
                }
                conn.query(sql, function(err : string, result) {
                    if(err){
                        return {
                            getUser : false, 
                            message : err
                        }
                    }
                    const match : boolean = bcrypt.compareSync(g_password, result[0]["password"]);
                    if(!match){
                        //password와 email모두 비교 완료
                        console.log("password가 다르다.");
                        return {
                            getUser : false,
                            message : "password가 다름"
                        };
                    }
                    //===== 2. Token 생성
                    console.log("token 생성해야 된다.");
                    //jwt.sign()
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
    
    createUser(){
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
                bcrypt.hash(g_password, salt, function(err : string, hash){
                    if(err){
                        return {
                            createSuccess : false,
                            message : err
                        }
                    }
                    //생성된 hash값 password로 입력
                    g_password = hash;
                    let sql : string = "insert into test.users value('" + g_email + "', '" + g_password + "', 'kmj', '', '', 100, 0, '" + NowTime() + "', 'kmj', '" + NowTime() + "', 'kmj')";
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
                        }
                    });
                });
            })
            .catch(err => {
                return {
                    createSuccess : false,
                    message : err
                }
            });
        
    }

    deleteUser(){
        //삭제 query 작성
        let sql : string = "delete from test.users where email='" + g_email + "'";
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
        let sql : string = "update test.users set name='명준'  where email='" + g_email + "'";
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
    return temp;
}
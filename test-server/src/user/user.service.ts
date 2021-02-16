import { Injectable } from '@nestjs/common';

let db_config = require("../db_connect/db_connect");
let conn = db_config.init();

//test를 위해 임시로 Global email, password를 설정해놓음
let g_email : string= "aja2467@google.com"
let g_password : string = "1234"

const bcrypt = require('bcrypt');
const saltRounds : number= 10;

//비동기처리가 되어있어서 그런것 같은데 DB로 연결한 다음 return 시키는 방법 찾아봐야 될듯
@Injectable()
export class UserService {
    getUser(){
        //1, DB에 요청된 Email과 PW에 맞는 데이터 확인
        //2. 있다면 token 생성
        let bSuccess : boolean;
        let sql : string = "select EXISTS (select password from test.users where email='" + g_email + "') as success";
        conn.query(sql, function(err : string, result){
            if(err){
                //console.log("query is not excuted. select fail" + err);
                return "query is not excuted. select fail" + err;
            }else{
                console.log(result[0]["success"]);
                if(result[0]["success"] == 1){
                    console.log("있음");
                    bSuccess = true;
                    let sql : string = "select password from test.users where email='" + g_email + "'";
                }else{
                    console.log("없음");
                    return {
                        selectSuccess : false,
                        message : "email에 대한 데이터가 없음"
                    }
                }
            }
        });       
    }
    
    createUser(){
        // bcrypt.genSalt(saltRounds, function(err, salt){
        //     bcrypt.hash(g_password, salt, function(err, hash){
        //         if(err) {

        //         }
        //     });
        // });
        
        console.log(g_password);
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
        })
    }

    patchUser(){
        //수정 query 작성
        let sql : string = "update test.users set name='명준' where email='" + g_email + "'";
        conn.query(sql, function(err: string){
            if(err){
                console.log("유저 수정 실패 : " + err);
                return "유저 수정 실패 : " + err;
            }else{
                console.log("유저 수정 성공");
                return "User patched completed";
            }
        })
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
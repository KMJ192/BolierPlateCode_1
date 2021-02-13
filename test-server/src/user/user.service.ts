import { Injectable } from '@nestjs/common';

let db_config = require("../db_connect/db_connect");
let conn = db_config.init();

//test를 위해 임시로 Global email을 설정해놓음
let g_email : string= "aja2467@google.com"

@Injectable()
export class UserService {
    getUser(){
        let sql : string = "select * from test.users where email='" + g_email + "'";
        conn.query(sql, function(err : string, rows){
            if(err){
                console.log("query is not excuted. select fail" + err);
                return "query is not excuted. select fail" + err;
            }else{
                console.log(rows)
                return rows;
            }
        });
    }

    createUser(){
        //email, password, name, userimage, token, token_exp, user_rol, created_at, cr
        //console.log(dateTime.getTime());
        let sql : string = "insert into test.users value('" + g_email + "', '1234', 'kmj', '', '', 100, 0, '" + NowTime() + "', 'kmj', '" + NowTime() + "', 'kmj')";
        conn.query(sql, function(err: string){
            if(err){
                if(String(err).includes("Duplicate")){
                    console.log("중복된 email");
                }
                console.log("유저 생성 실패 : " + err);
                return "유저 생성 실패 : " + err;
            }else{
                console.log("유저 생성 성공");
                return "User created completed";
            }
        })
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
        temp = temp + ":0" + String(dateTime.getSeconds()) + "." + String(dateTime.getMilliseconds());
    }else{
        temp = temp + ":" + String(dateTime.getSeconds()) + "." + String(dateTime.getMilliseconds());
    }
    return temp;
}
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
let db_config = require("../db_connect/db_connect");
let conn = db_config.init();
let g_email = "aja2467@google.com";
let g_password = "1234";
const bcrypt = require('bcrypt');
const saltRounds = 10;
let UserService = class UserService {
    getUser() {
        let bSuccess;
        let sql = "select EXISTS (select password from test.users where email='" + g_email + "') as success";
        conn.query(sql, function (err, result) {
            if (err) {
                return "query is not excuted. select fail" + err;
            }
            else {
                console.log(result[0]["success"]);
                if (result[0]["success"] == 1) {
                    console.log("있음");
                    bSuccess = true;
                    let sql = "select password from test.users where email='" + g_email + "'";
                }
                else {
                    console.log("없음");
                    return {
                        selectSuccess: false,
                        message: "email에 대한 데이터가 없음"
                    };
                }
            }
        });
    }
    createUser() {
        console.log(g_password);
        let sql = "insert into test.users value('" + g_email + "', '" + g_password + "', 'kmj', '', '', 100, 0, '" + NowTime() + "', 'kmj', '" + NowTime() + "', 'kmj')";
        conn.query(sql, function (err) {
            if (err) {
                console.log("유저 생성 실패 : " + err);
                return {
                    createSuccess: false,
                    message: "가입실패"
                };
            }
            else {
                console.log("유저 생성 성공");
                return {
                    createSuccess: true,
                    message: "가입성공"
                };
            }
        });
    }
    deleteUser() {
        let sql = "delete from test.users where email='" + g_email + "'";
        conn.query(sql, function (err) {
            if (err) {
                console.log("유저 삭제 실패 : " + err);
                return "유저 삭제 실패 : " + err;
            }
            else {
                console.log("유저 삭제 성공");
                return "User deleted completed";
            }
        });
    }
    patchUser() {
        let sql = "update test.users set name='명준' where email='" + g_email + "'";
        conn.query(sql, function (err) {
            if (err) {
                console.log("유저 수정 실패 : " + err);
                return "유저 수정 실패 : " + err;
            }
            else {
                console.log("유저 수정 성공");
                return "User patched completed";
            }
        });
    }
};
UserService = __decorate([
    common_1.Injectable()
], UserService);
exports.UserService = UserService;
function NowTime() {
    let dateTime = new Date();
    let temp = String(dateTime.getFullYear());
    if (String(dateTime.getMonth()).length == 1) {
        temp = temp + "/0" + String(dateTime.getMonth());
    }
    else {
        temp = temp + "/" + String(dateTime.getMonth());
    }
    if (String(dateTime.getDate()).length == 1) {
        temp = temp + "/0" + String(dateTime.getDate());
    }
    else {
        temp = temp + "/" + String(dateTime.getDate());
    }
    if (String(dateTime.getHours()).length == 1) {
        temp = temp + "  0" + String(dateTime.getHours());
    }
    else {
        temp = temp + "  " + String(dateTime.getHours());
    }
    if (String(dateTime.getMinutes()).length == 1) {
        temp = temp + ":0" + String(dateTime.getMinutes());
    }
    else {
        temp = temp + ":" + String(dateTime.getMinutes());
    }
    if (String(dateTime.getSeconds()).length == 1) {
        temp = temp + ":0" + String(dateTime.getSeconds());
    }
    else {
        temp = temp + ":" + String(dateTime.getSeconds());
    }
    return temp;
}
//# sourceMappingURL=user.service.js.map
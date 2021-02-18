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
const bcrypt = require('bcrypt');
const saltRounds = 10;
let db_config = require("../db_connect/db_connect");
let conn = db_config.init();
let userEmail;
let userPassword;
let UserService = class UserService {
    getUser(body) {
        userEmail = body["email"];
        userPassword = body["password"];
        let sql = "select EXISTS (select password from test.users where email='" + userEmail + "') as success";
        const comPw = new Promise((resolve, reject) => {
            conn.query(sql, function (err, result) {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
        sql = "select password from test.users where email='" + userEmail + "'";
        comPw
            .then(result => {
            if (result[0]["success"] != 1) {
                console.log("email이 없음");
                return {
                    getUser: false,
                    message: "등록된 email이 아닙니다."
                };
            }
            conn.query(sql, function (err, result) {
                if (err) {
                    return {
                        getUser: false,
                        message: err
                    };
                }
                const match = bcrypt.compareSync(userPassword, result[0]["password"]);
                if (!match) {
                    console.log("password가 다르다.");
                    return {
                        getUser: false,
                        message: "password가 다름"
                    };
                }
                console.log("token 생성해야 된다.");
                return {
                    getUser: true,
                    message: "성공"
                };
            });
        })
            .catch(err => {
            return {
                getUser: false,
                message: err
            };
        });
    }
    createUser(body) {
        userEmail = body["email"];
        userPassword = body["password"];
        let userName = body["name"];
        let token_exp = body["token_exp"];
        let userRol = body["user_rol"];
        let createdUser = body["created_at"];
        let updatedUser = body["updated_at"];
        const pwEncrypt = new Promise((resolve, rejects) => {
            bcrypt.genSalt(saltRounds, function (err, salt) {
                if (err) {
                    rejects(err);
                }
                resolve(salt);
            });
        });
        pwEncrypt
            .then((salt) => {
            bcrypt.hash(userPassword, salt, function (err, hash) {
                if (err) {
                    return {
                        createSuccess: false,
                        message: err
                    };
                }
                userPassword = hash;
                let sql = "insert into test.users value('" + userEmail + "', '" + userPassword + "', '" + userName + "', '', '', " + token_exp + ", '" + userRol + "', '" + NowTime() + "', '" + createdUser + "', '" + NowTime() + "', '" + updatedUser + "')";
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
            });
        })
            .catch(err => {
            return {
                createSuccess: false,
                message: err
            };
        });
    }
    deleteUser(body) {
        userEmail = body["email"];
        userPassword = body["password"];
        let sql = "delete from test.users where email='" + userEmail + "'";
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
        userEmail = "aja2467@google.com";
        let sql = "update test.users set name='명준', updated_at='" + NowTime() + "' where email='" + userEmail + "'";
        console.log(sql);
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
    temp = temp + ":" + String(dateTime.getMilliseconds());
    return temp;
}
//# sourceMappingURL=user.service.js.map
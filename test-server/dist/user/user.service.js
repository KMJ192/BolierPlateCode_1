"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const switch_1 = require("../switch/switch");
const bcrypt = require("bcrypt");
let db_config = require("../database/db_connect");
let conn = db_config.init();
let UserService = class UserService {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    async RegisterUser(userData, user_image) {
        let resultMsg;
        let sFlag = false;
        if (userData["user_rol"] == 0) {
            let sql = "select EXISTS (select password from " + switch_1.switching + ".users where email='" + userData["email"] + "') as success";
            const emailExists = await SQLQueryRun(sql);
            if (emailExists[0]["success"] == 0) {
                sql = "select EXISTS (select password from " + switch_1.switching + ".users where name='" + userData["name"] + "') as success";
                const dupUsername = await SQLQueryRun(sql);
                if (dupUsername[0]["success"] == 0) {
                    const hashedPassword = await bcrypt.hash(userData["password"], 10);
                    sql = "insert into " + switch_1.switching + ".users value('" + userData["email"] + "', '" + hashedPassword + "', '" + userData["name"] + "', '" + user_image + "', '" + userData["user_rol"] + "', '" + NowTime() + "', '" + userData["created_by"] + "', '" + NowTime() + "', '" + userData["updated_by"] + "')";
                    SQLQueryRun(sql);
                    sFlag = true;
                    resultMsg = "Signup success";
                }
                else {
                    sFlag = false;
                    resultMsg = "Duplicated name";
                }
            }
            else {
                sFlag = false;
                resultMsg = "Duplicated email";
            }
        }
        else {
            sFlag = false;
            resultMsg = "User rol error";
        }
        return {
            registerd: sFlag,
            message: resultMsg
        };
    }
    async Login(email, password, response) {
        let resultMsg;
        let sFlag = false;
        let sql = "select EXISTS (select password from " + switch_1.switching + ".users where email='" + email + "') as success";
        const emailExists = await SQLQueryRun(sql);
        if (emailExists[0]["success"] == 1) {
            sql = "select password from " + switch_1.switching + ".users where email='" + email + "'";
            const dbPw = await SQLQueryRun(sql);
            const match = await bcrypt.compareSync(password, dbPw[0]["password"]);
            if (match) {
                const jwt = await this.jwtService.signAsync({
                    id: email
                });
                response.cookie('jwt', jwt, { httpOnly: true });
                sFlag = true;
                resultMsg = "Login success";
            }
            else {
                resultMsg = "Different pw";
            }
        }
        else {
            resultMsg = "None email";
        }
        return {
            login: sFlag,
            message: resultMsg
        };
    }
    async ConfirmUser(request) {
        let email;
        let verifed = false;
        let username, userimage;
        let resultMsg;
        if (request["cookies"]["jwt"] == null) {
            resultMsg = "none jwt";
        }
        else {
            try {
                let sql;
                let user_data;
                const cookie = await request.cookies['jwt'];
                await this.jwtService.verifyAsync(cookie).then(value => {
                    email = value["id"];
                });
                sql = "select name, user_image from " + switch_1.switching + ".users where email='" + email + "'";
                user_data = await SQLQueryRun(sql);
                username = user_data[0]["name"];
                userimage = user_data[0]["user_image"];
                resultMsg = "success";
                verifed = true;
            }
            catch (e) {
                verifed = false;
                resultMsg = e;
            }
        }
        return {
            useremail: email,
            username: username,
            userimage: userimage,
            result: verifed,
            message: resultMsg
        };
    }
    async Logout(response) {
        response.clearCookie('jwt');
        return {
            message: "success"
        };
    }
    async DeleteUser(email) {
        let sql = "delete from " + switch_1.switching + ".users where email='" + email + "'";
        const result = await SQLQueryRun(sql);
        return result;
    }
    async PatchUser(userData, user_image) {
        let resultMsg;
        let sFlag = false;
        let sql = "select EXISTS (select password from " + switch_1.switching + ".users where name='" + userData["name"] + "') as success";
        const dupUsername = await SQLQueryRun(sql);
        if (dupUsername[0]["success"] == 0) {
            if (user_image == "") {
                sql = "update " + switch_1.switching + ".users set name='" + userData["name"] + "', updated_at='" + NowTime() + "' where email='" + userData["email"] + "'";
            }
            else {
                sql = "update " + switch_1.switching + ".users set name='" + userData["name"] + "', user_image='" + user_image + "',updated_at='" + NowTime() + "' where email='" + userData["email"] + "'";
            }
            await SQLQueryRun(sql);
            resultMsg = "Patch success";
            sFlag = true;
        }
        else {
            resultMsg = "Duplicated name";
        }
        return {
            patch: sFlag,
            message: resultMsg
        };
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], UserService);
exports.UserService = UserService;
function SQLQueryRun(sql) {
    return new Promise((resolve, reject) => {
        conn.query(sql, function (err, result) {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    });
    ;
}
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
        temp = temp + " 0" + String(dateTime.getHours());
    }
    else {
        temp = temp + " " + String(dateTime.getHours());
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
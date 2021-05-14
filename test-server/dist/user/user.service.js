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
const NowTime_1 = require("../function/NowTime");
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
            const hashedPassword = await bcrypt.hash(userData["password"], 10);
            const sql = "insert into " + switch_1.switching + ".users value('" + userData["email"] + "', '" + hashedPassword + "', '" + userData["nickname"] + "', '" + user_image + "', '" + userData["user_rol"] + "', '" + NowTime_1.NowTime() + "', '" + userData["created_by"] + "', '" + NowTime_1.NowTime() + "', '" + userData["updated_by"] + "')";
            const result = await SQLQueryRun(sql);
            if (result["protocol41"] == true) {
                sFlag = true;
                resultMsg = "Signup success";
            }
            else {
                resultMsg = "error";
            }
        }
        else {
            resultMsg = "User rol error";
        }
        return {
            result: sFlag,
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
                resultMsg = "success";
            }
            else {
                resultMsg = "E-P-00";
            }
        }
        else {
            resultMsg = "E-P-01";
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
            nickname: username,
            user_image: userimage,
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
    async DeleteUser(email, response) {
        let sql = "delete from " + switch_1.switching + ".users where email='" + email + "'";
        const result = await SQLQueryRun(sql);
        response.clearCookie('jwt');
        return result;
    }
    async PatchUser(userData, user_image) {
        let resultMsg;
        let sFlag = false;
        let sql = "update " + switch_1.switching + ".users set";
        if (userData["nickname"] != "") {
            sql = sql + " name='" + userData["nickname"] + "',";
        }
        else if (userData["password"] != "") {
            sql = sql + " password='" + userData["password"] + "',";
        }
        sql = sql + " user_image='" + user_image + "',";
        sql = sql + " updated_at='" + NowTime_1.NowTime() + "' where email='" + userData["email"] + "'";
        await SQLQueryRun(sql);
        resultMsg = "Patch success";
        sFlag = true;
        return {
            patch: sFlag,
            message: resultMsg
        };
    }
    async EmailConfirm(email) {
        const sql = "select EXISTS (select password from " + switch_1.switching + ".users where email='" + email + "') as success";
        const result = await SQLQueryRun(sql);
        return {
            result: result[0]["success"].toString()
        };
    }
    async NicknameConfirm(nickname) {
        const sql = "select EXISTS (select password from " + switch_1.switching + ".users where name='" + nickname + "') as success";
        const result = await SQLQueryRun(sql);
        return {
            result: result[0]["success"].toString()
        };
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], UserService);
exports.UserService = UserService;
async function SQLQueryRun(sql) {
    return new Promise((resolve, reject) => {
        conn.query(sql, function (err, result) {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    });
}
//# sourceMappingURL=user.service.js.map
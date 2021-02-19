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
const bcrypt = require("bcrypt");
let db_config = require("../db_connect/db_connect");
let conn = db_config.init();
let UserService = class UserService {
    async getUser(body) {
        let resultMsg;
        let sFlag = false;
        let sql = "select EXISTS (select password from test.users where email='" + body["email"] + "') as success";
        const emailExists = await SQLQueryRun(sql);
        if (emailExists[0]["success"] == 1) {
            sql = "select password from test.users where email='" + body["email"] + "'";
            const dbPw = await SQLQueryRun(sql);
            const match = await bcrypt.compareSync(body["password"], dbPw[0]["password"]);
            if (match) {
                sFlag = true;
                resultMsg = "token생성하기";
            }
            else {
                resultMsg = "Different pw";
            }
        }
        else {
            resultMsg = "Dose not exist email";
        }
        return {
            login: sFlag,
            message: resultMsg
        };
    }
    async createUser(userData) {
        let sql = "select EXISTS (select password from test.users where email='" + userData["email"] + "') as success";
        const emailExists = await SQLQueryRun(sql);
        if (emailExists[0]["success"] == 0) {
            const hashedPassword = await bcrypt.hash(userData["password"], 10);
            sql = "insert into test.users value('" + userData["email"] + "', '" + hashedPassword + "', '" + userData["name"] + "', '" + userData["user_image"] + "', '', " + userData["token_exp"] + ", '" + userData["user_rol"] + "', '" + NowTime() + "', '" + userData["created_by"] + "', '" + NowTime() + "', '" + userData["updated_by"] + "')";
            return SQLQueryRun(sql);
        }
        else {
            return {
                registerd: false,
                message: "중복된 이메일"
            };
        }
    }
    async deleteUser(body) {
        let sql = "delete from test.users where email='" + body["email"] + "'";
        const result = await SQLQueryRun(sql);
        return result;
    }
    async patchUser(body) {
        let sql = "update test.users set name='" + body["name"] + "', updated_at='" + NowTime() + "' where email='" + body["email"] + "'";
        const result = await SQLQueryRun(sql);
        return result;
    }
    async dbTest(userData) {
        return userData;
    }
};
UserService = __decorate([
    common_1.Injectable()
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
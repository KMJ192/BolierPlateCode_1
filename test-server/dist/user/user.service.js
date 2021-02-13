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
let UserService = class UserService {
    getUser() {
        let sql = "select * from test.users where email='" + g_email + "'";
        conn.query(sql, function (err, rows) {
            if (err) {
                console.log("query is not excuted. select fail" + err);
                return "query is not excuted. select fail" + err;
            }
            else {
                console.log(rows);
                return rows;
            }
        });
    }
    createUser() {
        let sql = "insert into test.users value('" + g_email + "', '1234', 'kmj', '', '', 100, 0, '" + NowTime() + "', 'kmj', '" + NowTime() + "', 'kmj')";
        conn.query(sql, function (err) {
            if (err) {
                if (String(err).includes("Duplicate")) {
                    console.log("중복된 email");
                }
                console.log("유저 생성 실패 : " + err);
                return "유저 생성 실패 : " + err;
            }
            else {
                console.log("유저 생성 성공");
                return "User created completed";
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
        temp = temp + ":0" + String(dateTime.getSeconds()) + "." + String(dateTime.getMilliseconds());
    }
    else {
        temp = temp + ":" + String(dateTime.getSeconds()) + "." + String(dateTime.getMilliseconds());
    }
    return temp;
}
//# sourceMappingURL=user.service.js.map
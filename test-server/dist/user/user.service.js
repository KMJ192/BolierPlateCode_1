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
var db_config = require("../db_connect/db_connect");
var conn = db_config.init();
let UserService = class UserService {
    getUser() {
        var sql = "Select * from test.users";
        conn.query(sql, function (err, rows) {
            if (err) {
                console.log("query is not excuted. select fail" + err);
                return "query is not excuted. select fail" + err;
            }
            else {
                console.log({
                    list: rows
                });
                return "Database connection Successed";
            }
        });
    }
};
UserService = __decorate([
    common_1.Injectable()
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map
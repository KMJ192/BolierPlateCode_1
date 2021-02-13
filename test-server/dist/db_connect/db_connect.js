"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_info_1 = require("./db_info");
let mysql = require('mysql');
module.exports = {
    init: function () {
        return mysql.createConnection(db_info_1.db_connect);
    },
    connect: function (conn) {
        conn.connect(function (err) {
            if (err) {
                console.log("Database connection Error : " + err);
            }
            else {
                console.log("Database connect complete");
            }
        });
    }
};
//# sourceMappingURL=db_connect.js.map
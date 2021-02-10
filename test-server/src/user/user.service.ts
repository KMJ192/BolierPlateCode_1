import { Injectable } from '@nestjs/common';

var db_config = require("../db_connect/db_connect");
var conn = db_config.init();

@Injectable()
export class UserService {
    getUser(){
        var sql : string = "Select * from test.users";
        conn.query(sql, function(err, rows){
            if(err){
                console.log("query is not excuted. select fail" + err);
                return "query is not excuted. select fail" + err;
            }else{
                console.log({
                    list : rows
                })
                return "Database connection Successed";
            }
        });
    }
}

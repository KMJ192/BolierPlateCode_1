import { db_connect } from './db_info';

let mysql = require('mysql');

module.exports = {
    init : function(){
        return mysql.createConnection(db_connect);
    },
    connect : function(conn) {
        conn.connect(function(err) {
            if(err){
                console.log("Database connection Error : " + err);
            }else{
                console.log("Database connect complete");
            }
        });
    }
}
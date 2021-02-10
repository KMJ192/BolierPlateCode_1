var mysql = require('mysql');
var db_connect = {
    host : "localhost",
    port : "3306",
    user : "root",
    password : "1234",
    database : "test"
}

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
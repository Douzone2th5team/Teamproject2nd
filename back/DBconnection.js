const mysql = require('mysql');  // mysql 모듈 로드
var dbconfig = require('./.env'); // DB접속 정보
const conn = {  // mysql 접속 설정
    host: dbconfig.host,
    port: dbconfig.port,
    user: dbconfig.user,
    password: dbconfig.password,
    database: dbconfig.database
};


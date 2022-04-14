const mysql = require('mysql');

const db = mysql.createPool({
host: 'kosa2.iptime.org',
user: 'admin_b',
password: '1234',
port: '50332',
database: 'database_development'
});

module.exports = db;

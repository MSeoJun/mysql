const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit : 10, 
    host            : 'localhost',
    user            : 'root',
    password        : 'noo1128148',
    database        : 'irving',
    dateStrings     : 'date' 
  });

  module.exports = pool;
var mysql = require('mysql');
// Initialize pool
var pool      =    mysql.createPool({
    connectionLimit : 10,
    host     : 'localhost',
    user     : 'root',
    password : '',
    database :'mckvieor_school',
    debug    :  false
});    
module.exports = pool;
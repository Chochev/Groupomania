const mysql = require('mysql2');
console.log('connectdb');
let connectdb = mysql.createConnection({ 
    host: 'localhost', 
    user: 'root', 
    password: 'P@ssword85', 
    database: 'grupomania', 
});
connectdb.connect(function(err) { 
    if (err) throw err;
    console.log('DB CONNECT!')
});

module.exports = connectdb;
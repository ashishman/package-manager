const mysql = require('mysql2');

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'ashish',
    password: 'ashish',
    database: 'packageManager'
})
mysqlConnection.connect((error) => {
    if (error) {
        console.log("Error in database", error);
    }else {
        console.log("Database Connected Successfully");
    }
})
module.export = mysqlConnection;
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.MYSQL_PASSWORD,
    database: 'e_2024'       //for 2019 election data use 'e_2024' database
                            //for 2024 election data use 'e2024' database
                            //for 2024 dummy data use 'dummy' database
});

module.exports = connection;
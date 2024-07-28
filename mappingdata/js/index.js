const fs = require('fs');
const csv = require('csv-parser');
const mysql = require('mysql');
require('dotenv').config();

// Create a connection to the MySQL database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.MYSQL_PASSWORD,
  database: 'e2024'
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database: ' + err.stack);
    return;
  }
  console.log('Connected to database as id ' + connection.threadId);
});

let count = 0;
let arr = new Set();
fs.createReadStream('../csv/candidates_data_2024.csv')
  .pipe(csv({skipLines: 0}))
  .on('data', (row) => {

    const selectedColumn = {
        name: row["Candidate"],
        constituency : row["Constituency"],
        state: row["State"]
    };
    const query = `select cand_id from candidates where name = "${selectedColumn.name}" `;

    connection.query(query, (err, result) => {
      if (err) {
        arr.add(selectedColumn.name+" "+selectedColumn.constituency+" "+selectedColumn.state);
        return;
      }
      if(result[0]){
        count++;
      }
      else{
        arr.add(selectedColumn.name+" "+selectedColumn.constituency);
      }
      console.log(count);
      if(count == 12722){
        console.log(arr);
        console.log(arr.size);
      }
    });

  })
  .on('end', () => {
        console.log('CSV file successfully processed');
        console.log("Success: "+count);
        connection.end(); 
  });
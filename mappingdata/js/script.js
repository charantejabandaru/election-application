const mysql = require('mysql2');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');
require('dotenv').config();

// Connect to the database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.MYSQL_PASSWORD,
    database: 'e2024'
  });

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }

  console.log('Connected to the database.');
  exportTableToCSV();
});

async function executeQuery(query){
  return new Promise((resolve ,reject) => {
    connection.query(query, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  })
}

async function exportTableToCSV() {
  // Query to fetch data
  const query1 = `select name,state,const_id from constituency`;
  const resultSet = await executeQuery(query1);
  resultSet.forEach((ele) => {
    const query2 =  `select p.party_id as party_id,c.cand_id as cand_id,c.name as name,p.name as party_name from candidates c join party p on p.party_id = c.party_id where const_name = "${ele.name}" and state = "${ele.state}"`;
    connection.query(query2, (error, results) => {
      if (error) {
        console.error(`Error executing query for table chittor:`, error.stack);
        return;
      }
  
      if (results.length === 0) {
        console.log(`No data found in table chittoor.`);
        return;
      }

      results.push({"party_id":"NOTA","cand_id":"cand9173","name":"None of the Above","party_name":"NOTA"});
      // Define the CSV file path
      const csvFilePath = `../constituencies543/constituency${ele.const_id}.csv`;
  
      // Create CSV writer
      const csvWriter = createCsvWriter({
        path: csvFilePath,
        header: Object.keys(results[0]).map((key) => ({ id: key, title: key }))
      });
  
      // Write data to CSV file
      csvWriter.writeRecords(results)
        .then(() => {
          console.log(`Data exported to ${csvFilePath} successfully.`);
        })
        .catch((err) => {
          console.error(`Error writing to CSV file:`, err.stack);
        });
    });
  });
}

// Close the database connection after all exports are done
process.on('exit', () => {
  connection.end();
  console.log('Database connection closed.');
});


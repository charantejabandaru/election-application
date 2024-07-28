const fs = require('fs');
const csv = require('csv-parser');
const mysql = require('mysql');
require('dotenv').config();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.MYSQL_PASSWORD,
    database: 'e2024'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database: ' + err.stack);
        return;
    }
    console.log('Connected to database as id ' + connection.threadId);
});

function executQuery(query) {
    return new Promise((resolve, reject) => {
        connection.query(query, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
}

function getBFObj() {
    return new Promise((resolve, reject) => {
        const bf = {};
        fs.createReadStream('../csvdata/BigFights.csv')
            .pipe(csv({ skipLines: 0 }))
            .on('data', (row) => {
                if (row["BF"]) {
                    if (!bf[row["BF"]]) {
                        bf[row["BF"]] = [];
                    }
                    bf[row["BF"]].push(row["cand_id"]);
                }
            })
            .on('end', () => {
                console.log('CSV file successfully processed');
                resolve(bf);
            });
    });
}

async function getBigFights(bf){
    const BigFightsData = {};
    for(let key in bf){
      const query1 = `select state,LOWER(const_name) as const_name,LOWER(name) as name,party_id from candidates where cand_id = "${bf[key][0]}"`;
      const query2 = `select LOWER(name) as name,party_id from candidates where cand_id = "${bf[key][1]}"`;
      const cand1 = await executQuery(query1);
      const cand2 = await executQuery(query2);
      if(!BigFightsData[cand1[0].state]){
          BigFightsData[cand1[0].state] = {};
      }
      if(!BigFightsData[cand1[0].state][cand1[0].const_name]){
          BigFightsData[cand1[0].state][cand1[0].const_name] = [];
      }
      const bfObj = {
          id1: bf[key][0],
          name1: cand1[0].name,
          party1: cand1[0].party_id,
          id2: bf[key][1],
          name2: cand2[0].name,
          party2: cand2[0].party_id
      }
      BigFightsData[cand1[0].state][cand1[0].const_name].push(bfObj);
    }
    connection.end();
    console.log(BigFightsData);
    fs.writeFileSync('../json/bigfights.json', JSON.stringify(BigFightsData,null,2), (err) => {
        if (err) {
            console.error('Error writing file:', err);
        } else {
            console.log('File has been written');
        }
    });
}

getBFObj().then((bf)=>{
    console.log(bf);
    getBigFights(bf);
});
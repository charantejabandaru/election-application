const fs = require('fs');
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

const celebrityJson = {};
async function getCelebrityId(){
    const query = `select * from candidates where cand_id in (select cand_id from spl_attributes)`;
    const ids = await executQuery(query);
    for(let i = 0 ; i < 18 ; i++){
        if(!celebrityJson[ids[i].state]){
            celebrityJson[ids[i].state] = {};
        }
        if(!celebrityJson[ids[i].state][ids[i].const_name]){
            celebrityJson[ids[i].state][ids[i].const_name] = [];
        }
        celebrityJson[ids[i].state][ids[i].const_name].push(ids[i].cand_id);
    }
    console.log(celebrityJson);
    fs.writeFileSync('../json/celebrity.json',JSON.stringify(celebrityJson,null,2),(err)=>{});
}

getCelebrityId();
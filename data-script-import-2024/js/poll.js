const fs = require('fs');
const csv = require('csv-parser');
/*const mysql = require('mysql');
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
}*/
let pollInfo = {};
fs.createReadStream('../csvdata/poll.csv')
    .pipe(csv({ skipLines: 0 }))
    .on('data',(row) => {
        const selectedColumn = {
            state : row["State"],
            constituency : row["Constituency"].toLowerCase(),
            electors : Number(row["Electors"]),
            poll: row["Poll"],
            votes: Number(row["Total Votes"]),
            phase: Number(row["Phase"]),
            date: row["Date"]
        }
        if(!pollInfo[selectedColumn.state]){
            pollInfo[selectedColumn.state] = {};
        }
        if(!pollInfo[selectedColumn.state][selectedColumn.constituency]){
            pollInfo[selectedColumn.state][selectedColumn.constituency] = {
                electors : selectedColumn.electors,
                poll_percent : selectedColumn.poll,
                votes : selectedColumn.votes,
                phase : selectedColumn.phase,
                date : selectedColumn.date
            };
        }
    })
    .on('end', async () => {
        console.log("CSV file successfully processed");
        console.log(pollInfo);
        fs.writeFileSync('../json/pollInfo.json',JSON.stringify(pollInfo,null,2), (err) => {
            if (err) {
                console.error('Error writing file:', err);
            } else {
                console.log('File has been written');
            }
        });
        /*const query = `select LOWER(name) as name from constituency`;
        const constituencies = await executQuery(query);
        let constituencyArr = Array.from(constituencySet);
        for(let item of constituencies){
            if(constituencyArr.includes(item.name)){
                constituencyArr = constituencyArr.filter((ele)=> ele != item.name);
            }
        }
        console.log(constituencyArr);
        connection.end();*/
    });
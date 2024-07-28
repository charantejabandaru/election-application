const mysql = require('mysql');
require('dotenv').config();

// Create a connection to the MySQL database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.MYSQL_PASSWORD,
    database: 'dummy'
  });
  
  // Connect to the database
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to database: ' + err.stack);
      return;
    }
    console.log('Connected to database as id ' + connection.threadId);
  });

const parties = [
    "AAP",
    "BSP",
    "BJP",
    "CPI(M)",
    "INC",
    "NPEP",
    "CPI",
    "JD(S)",
    "JD(U)",
    "ADMK",
    "DMK",
    "NPF",
    "NCP",
    "RJD",
    "TDP",
    "YSRCP",
    "AIFB",
    "AIMIM",
    "AIUDF",
    "AJSUP",
    "ADAL",
    "AGP",
    "BRS",
    "TRS",
    "BJD",
    "BOPF",
    "CPI(ML)(L)",
    "DMDK",
    "INLD",
    "IUML",
    "JKNC",
    "PDP",
    "JKNPP",
    "JJP",
    "JMM",
    "KEC(M)",
    "LJP(RV)",
    "MNF",
    "NDPP",
    "RLP",
    "RGP",
    "RSP",
    "SP",
    "SAD",
    "SDF",
    "SKM",
    "SHS",
    "SHS(UBT)",
    "SUCI",
    "UDP",
    "UPPL",
    "VPI",
    "VPP",
    "ZPM",
  ];

async function check(){
    const query = `SELECT const.state, const.const_id, LOWER(const.name) AS const_name, cand.cand_id, LOWER(cand.name) AS cand_name, cand.party_id, cont.votes, prty.alliance,const.rsDecl FROM constituency const JOIN contests cont ON const.const_id = cont.const_id JOIN candidates cand ON cand.cand_id = cont.cand_id JOIN party prty on cand.party_id = prty.party_id ORDER BY const.state ASC, const.name ASC, cont.votes DESC`;
    const resultSet = await executeQuery(query); 
}
const executeQuery = (query) => {
    return new Promise((resolve, reject) => {
        connection.query(query, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

function getRandomIntBetween(min, max) {
   return Math.floor(Math.random() * (max - min + 1)) + min;
}
check();
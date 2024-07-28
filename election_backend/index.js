require("dotenv").config();
const fs = require('fs');
const AWS = require('aws-sdk');
const cors = require('cors');
const express = require("express");
const jwt = require("jsonwebtoken");
var bodyparser = require("body-parser");
const connection = require("./model");

const app = express();

app.use(cors({
    origin: '*',
    credentials: true
}));

app.use(bodyparser.urlencoded({extended : true}));
app.use(bodyparser.json());

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database: ' + err.stack);
        return;
    }
    console.log('Connected to database as id ' + connection.threadId);
});

// Set the region and access keys
AWS.config.update({
  region: 'ap-south-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});


// Create a new instance of the S3 class

const validationQuery = "SELECT COUNT(*) AS count FROM users WHERE user_id = ? AND password = ?;";
const postTokenQuery = "INSERT INTO tokenised (user_id,tokens) VALUES (?, ?)";
const checkTokenQuery ="SELECT COUNT(*) AS count FROM tokenised WHERE tokens=?;";

app.get("/login", (req, res) => {
  const { userId, pwd } = req.query;
  connection.query(validationQuery, [userId, pwd], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Server error");
    } else {
      if (result[0].count > 0) {
        jwt.sign({ userId }, process.env.SECRETKEY, (err, token) => {
          if (err) {
            console.log(err);
            res.status(500).send("Token generation error");
          } else {
            console.log("hit");
            console.log(token);
            connection.query(postTokenQuery, [userId, token], (err, result) => {
              if (err) {
                console.log(err);
                res.status(500).send("Database update error");
              } else {
                console.log(token);
                res.status(200).send(token);
              }
            });
          }
        });
      } else {
        res.status(401).send("Invalid credentials");
      }
    }
  });
},
(error) => {
     if (error) {
       return error;
     }
  });

async function getConstituencyData() {
  const query = `SELECT const.state, const.const_id, LOWER(const.name) AS const_name, cand.cand_id, LOWER(cand.name) AS cand_name, cand.party_id, cont.votes, prty.alliance,const.rsDecl FROM constituency const JOIN contests cont ON const.const_id = cont.const_id JOIN candidates cand ON cand.cand_id = cont.cand_id JOIN party prty on cand.party_id = prty.party_id ORDER BY const.state ASC, const.name ASC, cont.votes DESC`;
  const resultSet = await executeQuery(query);
 // const constituencyData = formatConstituencyData(resultSet);
  const stateData = formatStateData(resultSet);
  const date = new Date();
  const timeStamp = {
    date : date.toDateString(),
    time : date.toTimeString()
  }
  stateData.push(timeStamp);
   return stateData;
}

app.get("/constituency-data", async (req, res) => {
  const result = await getConstituencyData();
  res.status(200).send(result);
},
(error) => {
  if (error) {
    return error;
  }
});

app.get("/constituency-code",async (req,res) =>{
  const sql = `select LOWER(name) as name,const_id,state from constituency order by state , name`;
  const result = await executeQuery(sql);
  let constituencyData = {};
  for(let item of result){
    if(!constituencyData[item.state]){
      constituencyData[item.state] = {};
    }
    constituencyData[item.state][item.name] = item.const_id;
  }
  res.send(constituencyData); 
});

app.get("/party-data", async (req,res) => {
  const query = `select name,party_id from parties`;
  const result = await executeQuery(query);
  let partyData = {};
  for(let item of result){
    partyData[item.name] = item.party_id;
  }
  res.send(partyData);
});

function formatConstituencyData(resultSet){
  const constituencyData = {};
  for (const item of resultSet) {
    if (!constituencyData[item.state]) {
      constituencyData[item.state] = {};
    }
    if (!constituencyData[item.state][item.const_id]) {
      constituencyData[item.state][item.const_id] = [];
    }
    constituencyData[item.state][item.const_id].push({
      "cId": item.cand_id,
      "cName": item.cand_name,
      "prty": item.party_id,
      "alnce": item.alliance,
      "vts": item.votes,
      "rsDecl":item.rsDecl
    });
  }
  return constituencyData;
}

function formatStateData(resultSet){
  const stateData = {};
  const allianceObj = {
    "NDA": 0,
    "OTH": 0,
    "INDIA":0
  }
  for (const item of resultSet) {
    if (!stateData[item.state]) {
      stateData[item.state] = {};
    }
    if (!stateData[item.state][item.const_name]) {
      stateData[item.state][item.const_name] = {
        "candidates" : [],
        "rsDecl" : item.rsDecl
      };
      if(item["alliance"] == "NDA" && item["votes"]){
        allianceObj["NDA"] = allianceObj["NDA"] + 1;
      }
      else if(item["alliance"] == "INDIA" && item["votes"]){
        if(!allianceObj["INDIA"]){
          allianceObj["INDIA"] = 0;
        }
        allianceObj["INDIA"] = allianceObj["INDIA"] + 1;
      }
      else if(item["alliance"] == "UPA" && item["votes"]){
        if(!allianceObj["UPA"]){
          allianceObj["UPA"] = 0;
        }
        allianceObj["UPA"] = allianceObj["UPA"] + 1;
      }
      else if(item["votes"]){
        allianceObj["OTH"] = allianceObj["OTH"] + 1;
      }
    }
    stateData[item.state][item.const_name]["candidates"].push({
      "cId": item.cand_id,
      "cName": toTitleCase(item.cand_name),
      "prty": item.party_id,
      "alnce": item.alliance,
      "vts": item.votes
    });
  }
  return [stateData,allianceObj];
}

function toTitleCase(name) {
  return name.split(' ').map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }).join(' ');
}

app.put("/update-votes", (req, res) => {
  const token = req.headers.authorization;
  jwt.verify(token, process.env.SECRETKEY, (err, decode) => {
    if (err) throw err;
    connection.query(checkTokenQuery, [token], (err, result) => {
      if (err) {
        res.status(500).send("");
      }
      console.log("Yes it is present");
      console.log(req.body);
      if (!Array.isArray(req.body) || req.body.length === 0) {
        res.status(400).send("Invalid format of data");
      }
      for(let votesData of req.body){
        console.log(votesData);
        const query = `update contests set votes = ${votesData.votes} where cand_id = "${votesData.candId}" and const_id = ${votesData.constituencyId} `;
        const query1 = `update constituency set rsDecl = ${votesData.rsDecl} where const_id = ${votesData.constituencyId}`;
        executeQuery(query).then(()=>{
          executeQuery(query1).catch((error)=>{
            console.log(error);
            return ;
          });
        })
        .catch((error) => {
          res.status(500).send(error);
        });
      }
      
      res.status(200).send({"message": "Data Updated Successfully",
        "timeStamp": new Date().getTime()
      });
    });
  });
},
(error) => {
  if (error) {
    return error;
  }
});

const executeQuery = (query) => {
  return new Promise((resolve, reject) => {
    connection.query(query, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

app.post("/upload-s3", async (req, res) => {
  const result = await getConstituencyData();

  const s3 = new AWS.S3();

  s3.putObject({
    Bucket: 'results2024',
    Key: 'results.json',
    Body: JSON.stringify(result),
    ContentType: "application/json"},
    function (err,data) {
      if(err){
        res.send(err);
      }
      console.log(JSON.stringify(err) + " " + JSON.stringify(result));
      res.status(200).send({"message": "Data Uploaded Successfully",
      "timeStamp": new Date().getTime()
    });
    }
  );

},
(error) => {
  if (error) {
    return error;
  }
});

app.listen(4200,()=>{
  console.log("running on port 4200");
});
require("dotenv").config();
const cors = require('cors');
const express = require("express");
var bodyparser = require("body-parser");

const app = express();

app.use(cors({
    origin: '*',
    credentials: true
}));
app.use(bodyparser.urlencoded({extended : true}));
app.use(bodyparser.json());
app.use(require("./config/configaws"));
app.use(require("./controllers/admin"));
app.use(require("./controllers/user"));

app.listen(4200,()=>{
  console.log("running on port 4200");
});
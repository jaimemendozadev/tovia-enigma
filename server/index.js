require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();

const bodyParser = require('body-parser');

console.log(`resolved path is ${path.resolve(__dirname, '../public')}`);

app.use(express.static(path.resolve(__dirname, '../public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const port = process.env.PORT || 3000;

app.listen(port, ()=>{
  console.log(`Listening on port ${port}`);    
});




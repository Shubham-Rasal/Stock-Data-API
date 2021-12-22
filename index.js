const express = require('express');
// 'use strict';
const requests = require('requests');
const fetch = require('node-fetch');
require('dotenv').config();
const port = process.env.PORT||3000;
// console.log(process.env);
const mysql = require('mysql');

const con = mysql.createConnection({
  host: "localhost",
  database:'api',
  user: "root",
  password: "mysqlpass"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to database successfully!");
 
  

  // var sql = "ALTER TABLE customers ADD COLUMN id INT AUTO_INCREMENT PRIMARY KEY";
  // con.query(sql, function (err, result) {
  //   if (err) throw err;
  //   console.log("Table altered");


// const adr="Highway 37";
//   con.query("SELECT * FROM customers WHERE address = "+mysql.escape(adr), function (err, result) {
//     if (err) throw err;
// var sql = "UPDATE customers SET address = 'Valley 345' WHERE address = 'Wall Street'";
// con.query(sql, function (err, result) {
//   if (err) throw err;
//   console.log(result.affectedRows + " record(s) updated");
//     console.log(result);
 
  // });


});

// con.end(()=>{
//   console.log('connection ended')
// });
// import fetch from './node_modules/node-fetch';
const app = express();
app.use(express.static('client'));
app.use(express.json({ limit: '1mb' }));


app.listen(port, () => console.log(`listening at ${port} `));


app.get('/stock',async (request, response) => {

  console.log('got request!!');
  // console.log(request);
  const api_key=process.env.API_KEY;
  const api_url = `https://www.alphavantage.co/query?function=REAL_GDP&interval=annually&apikey=${api_key}`;
   const fresponse = await fetch(api_url);
  const json= await fresponse.json();
  // console.log(json.data);
  response.json(json);
  const stockData=json.data;

 for (let index = stockData.length-1; index >0; index--) {
   const element = stockData[index];
   
    insert(element.date.slice(0,4),element.value);
 }


});
var counter=0;
function insert(date,value) {
  // console.log('hello');
  counter++;
  console.log(date);
  console.log(value);
  var sql = `INSERT INTO gdp_data (date, value) VALUES ('${date}', '${value}')`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log( counter+" record inserted");
    console.log(result);
});
}
function createTable(props){
    var sql = `CREATE TABLE customers (id INT AUTO_INCREMENT PRIMARY KEY, ${props.one} VARCHAR(255), ${props.two} VARCHAR(255))`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created!");
  });

}
function createDatabase(name){
   con.query(`CREATE DATABASE ${name}`, function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
}
function selectColumn(column_name,table_name){
  
  con.query(`SELECT ${column_name} FROM ${table_name}`, function (err, result, fields) {
    if (err) throw err;
    // console.log(result[1]);
    console.log(fields);

  });
}
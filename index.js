const express = require('express');
// 'use strict';
const requests = require('requests');
const fetch = require('node-fetch');
require('dotenv').config();
const port = process.env.PORT||3000;
// console.log(process.env);

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

});

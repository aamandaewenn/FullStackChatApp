'use strict';
// load package
const express = require('express');
const PORT = 8080;
const HOST = '0.0.0.0';
let mysql = require('mysql');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

let connection =  mysql.createConnection({
    host: "mysql1",
    user: "root",
    password: "admin",
  });

app.get('/hello', (req, res) =>
  {
    res.send('Hello World!')
  })

app.post('/init', (req, res) =>
  {
    connection.query('CREATE DATABASE IF NOT EXISTS channeldb', function (error,result){
      if (error) console.log(error);
  });

  connection.query('CREATE DATABASE IF NOT EXISTS postsdb', function(error, result){
    if (error) console.log(error);
  })

  connection.query('USE channeldb', function(error, results)
{
    if (error) console.log(error);
});

connection.query(`CREATE TABLE IF NOT EXISTS channels 
( id int unsigned NOT NULL auto_increment, name VARCHAR(150) NOT NULL
PRIMARY KEY (id)
)`, function(error,result) {
  if (error) console.log(error);
  res.json(result);

});

  })

app.post('/createChannel', (req, res) =>
{
  var name = req.body.name;

  connection.use('USE postdb', function (error, results)
  {
      if (error) console.log(error);
  });

  connection.query(`CREATE IF NOT EXISTS (name)('${name}') 
  (id int unsigned NOT NULL autoincrement, data VARCHAR(300) NOT NULL, reply_to int unsigned)`)

  connection.query('USE channeldb', function(error, results)
  {
      if (error) console.log(error);
  });
  var query = `INSERT INTO channels (name) VALUES ('${name}')`;
  console.log('channel added');

  connection.query(query, function(error, results)
  {
    if (error) console.log(error)
    res.json(results);
    
  });
})

app.get('/getChannels', (req, res)=>{
  connection.query('USE channeldb', function(error, results)
  {
      if (error) console.log(error);
  });
  const sql = `SELECT * FROM channel`;
  connection.query(sql, function (err, result) {
    if (err) throw err;
    res.json(result);
    });
})


app.listen(PORT, HOST);
console.log('up and running');
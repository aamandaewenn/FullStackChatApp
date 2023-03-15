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
connection.connect();
  
app.get('/hello', (req, res) =>
{
  res.send('Hello World!')
})

app.post('/init', (req, res) =>
{
connection.query('CREATE DATABASE IF NOT EXISTS postdb', function (error,result){
    if (error) console.log(error);
});

connection.query('USE postdb', function(error, results)
{
    if (error) console.log(error);
});

connection.query(`DROP TABLE IF EXISTS posts`)

connection.query(`CREATE TABLE IF NOT EXISTS posts 
( id int unsigned NOT NULL auto_increment, topic VARCHAR(150) NOT NULL, 
data VARCHAR(500) NOT NULL,
PRIMARY KEY (id)
)`, function(error,result) {
  if (error) console.log(error);
  res.json(result);

});
});

app.post('/addPost', (req, res)=>
  {
    console.log('called addPost');
    var topic = req.body.topic;
    var data = req.body.data;

    var query = `INSERT INTO posts (topic, data) VALUES ('${topic}', '${data}')`;
    console.log('post added');

    connection.query(query, function(error, results)
    {
      if (error) console.log(error)
      res.json(results);
      
    });
  });

app.get('/getPosts', (req, res) => {
  console.log('called get posts');
  connection.query('USE postdb', function(error, results)
{
    if (error) console.log(error);
});
  const sql = `SELECT topic, data FROM posts`;
  connection.query(sql, function (err, result) {
    if (err) throw err;
    res.json(result);
    });
  });

app.listen(PORT, HOST);
console.log('up and running');
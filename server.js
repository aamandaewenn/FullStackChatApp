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
( id int unsigned NOT NULL auto_increment, name VARCHAR(150) NOT NULL, PRIMARY KEY (id)
)`, function(error,result) {
  if (error) console.log(error);
  res.json(result);

});

  })

// to create a new channel
app.post('/createChannel', (req, res) =>
{
  var name = req.body.name;

  connection.query('USE postsdb', function (error, results)
  {
      if (error) console.log(error);
  });

  //connection.query(`CREATE TABLE IF NOT EXISTS ${name}, 
  //( id int unsigned NOT NULL auto_increment, data VARCHAR(300) NOT NULL, replyTo int unsigned, PRIMARY KEY (id))`)

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

// to list all the channels
app.get('/getChannels', (req, res)=>{
  connection.query('USE channeldb', function(error, results)
  {
      if (error) console.log(error);
  });
  const sql = `SELECT * FROM channels`;
  connection.query(sql, function (err, result) {
    if (err) throw err;
    res.json(result);
    });
})

app.post('/addPost', (req, res)=>
  {
    console.log('called addPost');
    var channel_id = req.body.channelID;
    var data = req.body.data;

    connection.query('USE postdb', function(error, results)
    {
        if (error) console.log(error);
    });

    // create a table for the channel for all posts
  connection.query(`CREATE TABLE IF NOT EXISTS posts ( id int unsigned NOT NULL auto_increment, data VARCHAR(300) NOT NULL, replyid int, channelid int NOT NULL, PRIMARY KEY (id))`,
  function(error,result) {
    if (error) console.log(error);
  
  });

  // later will have add reply method to create a table for the reply



    var query = `INSERT INTO posts (data, channelid) VALUES ('${data}', ${channel_id})`;
    console.log('post added');

    connection.query(query, function(error, results)
    {
      if (error) console.log(error)
      res.json(results);
      
    });
  });

  app.get('/getPosts/:channelid', (req, res) =>
  {
      var channel_id = req.params.channelid
      connection.query('USE postdb', function(error, results)
  {
      if (error) console.log(error);
  });
  const sql = `select * from posts where channelid = ${channel_id};`;
  connection.query(sql, function (err, result) {
    if (err) throw err;
    res.json(result);
    });

  })

  app.post('/addReply', (req, res)=>
  {
    console.log('called addReply');
    var channel_id = req.body.channelID;
    var data = req.body.data;
    var post_id = req.body.postID;

    connection.query('USE postdb', function(error, results)
    {
        if (error) console.log(error);
    });


    var query = `INSERT INTO posts (data, channelid, replyid) VALUES ('${data}', ${channel_id}, ${post_id})`;
    console.log('post added');

    connection.query(query, function(error, results)
    {
      if (error) console.log(error)
      res.json(results);
      
    });
  });




app.listen(PORT, HOST);
console.log('up and running');
'use strict';
// load package
const express = require('express');
const PORT = 8080;
const HOST = '0.0.0.0';
let mysql = require('mysql');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const {sign} = require('jsonwebtoken');
const {validateToken} = require('./middlewares/AuthMiddleware')

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

app.post('/init', async (req, res) =>
  {
    connection.query('CREATE DATABASE IF NOT EXISTS channeldb', function (error,result){
      if (error) console.log(error);
  });

  connection.query('CREATE DATABASE IF NOT EXISTS postdb', function(error, result){
    if (error) console.log(error);
  })

  connection.query('CREATE DATABASE IF NOT EXISTS logindb', function(error, result){
    if (error) console.log(error);
  })

  connection.query('USE logindb', function(error, result){
    if (error) console.log(error);
  })

  connection.query(`CREATE TABLE IF NOT EXISTS users (id int unsigned NOT NULL auto_increment, username VARCHAR(25) NOT NULL, password VARCHAR(300) NOT NULL, admin boolean, PRIMARY KEY (id))`, function(error,result) {
    if (error) console.log(error);})


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
app.post('/createChannel', validateToken, async (req, res) =>
{
  var name = req.body.name;


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
app.get('/getChannels', async (req, res)=>{
  console.log('get channels called')
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

app.post('/addPost',validateToken, async (req, res)=>
  {
    console.log('called addPost');
    var channel_id = req.body.channelID;
    var data = req.body.data;
    var username = req.user.username;

    connection.query('USE postdb', function(error, results)
    {
        if (error) console.log(error);
    });

    // create a table for the channel for all posts
  connection.query(`CREATE TABLE IF NOT EXISTS posts ( id int unsigned NOT NULL auto_increment, data VARCHAR(300) NOT NULL, replyid int, channelid int NOT NULL, rating int, username VARCHAR(30) NOT NULL, PRIMARY KEY (id))`,
  function(error,result) {
    if (error) console.log(error);
  
  });


    var query = `INSERT INTO posts (data, channelid, rating, username) VALUES ('${data}', ${channel_id}, ${0}, '${username}')`;
    console.log('post added');

    connection.query(query, function(error, results)
    {
      if (error) console.log(error)
      res.json(results);
      
    });
  });

  app.get('/getPosts/:channelid', async (req, res) =>
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

  app.post('/addReply', validateToken, async (req, res)=>
  {
    console.log('called addReply');
    var channel_id = req.body.channelID;
    var data = req.body.data;
    var post_id = req.body.postID;
    var username = req.user.username;

    connection.query('USE postdb', function(error, results)
    {
        if (error) console.log(error);
    });


    var query = `INSERT INTO posts (data, channelid, replyid, rating, username) VALUES ('${data}', ${channel_id}, ${post_id}, ${0}, '${username}')`;
    console.log('post added');

    connection.query(query, function(error, results)
    {
      if (error) console.log(error)
      res.json(results);
      
    });
  });

  app.get('/getReplies/:channelid/:postid', async (req, res) =>
  {
      var channel_id = req.params.channelid
      var replyTo = req.params.postid
      connection.query('USE postdb', function(error, results)
  {
      if (error) console.log(error);
  });
  const sql = `select * from posts where replyid = ${replyTo};`;
  connection.query(sql, function (err, result) {
    if (err) throw err;
    res.json(result);
    });

  })

  app.post('/updateRating', validateToken, async (req, res)=>
  {
    console.log('update rating called')
    var post_id = req.body.postID;
    var rating = req.body.rating;
    console.log(rating)

    connection.query('USE postdb', function(error, results)
    {
        if (error) console.log(error);
    });

    var query = `UPDATE posts SET rating = ${rating} WHERE id = ${post_id}`
    connection.query(query, function(error, results)
    {
        if (error) console.log(error);
    });

  })

  app.post('/register', async (req, res)=>
    {
      console.log('adding new user')
      var username = req.body.username;
      var password=req.body.password;

      console.log(username)

      connection.query(`use logindb`, function(error, results)
      {
          if (error) console.log(error);
      });

      bcrypt.hash(password, 10).then((hash)=>{

      connection.query(`INSERT INTO users (username, password, admin) VALUES ('${username}','${hash}', FALSE )`,function(error, results)
      {
          if (error) console.log(error);
          res.json('user added');
      });
    });
    })

    app.post('/login', async (req, res)=>{
      console.log('login called')
      console.log(req.body)
      var password = req.body.password;
      var username = req.body.username;
      console.log(password)

      connection.query(`use logindb`, function(error, results)
      {
          if (error) console.log(error);
      });

      var query = `SELECT * from users WHERE username='${username}' LIMIT 1`
      connection.query(query, function(error, results)
    {
        if (error) console.log(error);
        var user = results;
        if (user[0] == undefined) res.json({error: 'User does not exist'});
        else{
          console.log(user[0])
          //console.log(user[0].password)

    bcrypt.compare(password, user[0].password).then((match) => {
    if (!match) res.json({error: 'Password is inccorect for that username'})
     
    else{

    const loginToken = sign({username: user[0].username, id: user[0].id
    }, "amandassecretstring");
    res.json(loginToken);
    }
    
    });}

    })

    }
 )

 app.get("/auth", validateToken, (req, res) => {
  res.json(req.user);
});

 app.get('/createAdmin', (req, res)=>
 {
  console.log('create admin occured')

      bcrypt.hash('abc123', 10).then((hash)=>{
        connection.query(`USE logindb`, function(error, results)
      {
          if (error) console.log(error);
      });

      connection.query(`INSERT INTO users (id, username, password, admin) VALUES ( ${1}, 'admin','${hash}', TRUE )`,function(error, results)
      {
          if (error) console.log(error);
          res.json('admin added');
      });
    });
 }
 )


app.listen(PORT, HOST);
console.log('up and running');
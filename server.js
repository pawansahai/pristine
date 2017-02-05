const express = require('express');
const app = express();
const bodyParser= require('body-parser')


app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs')
 //lets require/import the mongodb native drivers.
var mongodb = require('mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://localhost:27017/my_database_name';
// Use connect method to connect to the Server
MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    //HURRAY!! We are connected. :)
    console.log('Connection established to', url);

    // do some work here with the database.

    //Close connection
    
    db.close();
  }
});

app.listen(3000, function() {
  console.log('listening on 3000')
})



app.get('/', function(req, res) {
 // res.send('Hello World')

// Use connect method to connect to the Server
MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    //HURRAY!! We are connected. :)
    console.log('Connection established to', url);
db.collection('users').find().toArray(function(err, results) {
  console.log(results)
  res.render('index.ejs', {users: results})
   //res.sendFile(__dirname + '/index.html',{data:results})
  
})
       //Close connection
    
    db.close();
  }
});


  
})
app.post('/users', (req, res) => {
// Use connect method to connect to the Server
MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    //HURRAY!! We are connected. :)
    console.log('Connection established to', url);

    // do some work here with the database.

    //Close connection
    db.collection('users').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
    db.close();
  }
});
  
})
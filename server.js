var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
// Takes the body of your request and parses it, it can be text
//
// multipart bodies
var bodyParser = require('body-parser');

var User = require('./models/user');

var app = express();

mongoose.connect('mongodb://root:abc123@ds051635.mongolab.com:51635/amansecm', function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to the database");
  }
});

// Middleware
app.use(morgan('dev'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/create-user', function(req, res, next) {
  var user = new User();

  user.profile.name = req.body.name;
  user.password = req.body.password;
  user.email = req.body.email;

  user.save(function(err) {
    if (err) next(err);

    res.json('Successfully created a new user');

  })
});

app.get('/', function(req, res) {
  var name = "Aman";
  res.json("My name is " + name + " the Royal King of Habeshas.");
});

app.get('/catname', function(req, res){
  res.json('BATman');
})


app.listen(3000, function(err){
  if(err) throw err;
  console.log("Server is running on port 3000");
});

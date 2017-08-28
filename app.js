const express = require('express');
const path = require('path');
const mustacheExpress = require('mustache-express');
const mustache = require('mustache');
const mongodb = require('mongodb');
const data = require('./robot_data.json');
//var bodyParser = require('body-parser');



const MongoClient = mongodb.MongoClient;
const mongoURL = 'mongodb://localhost:27017/newdb';

const app = express();


app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');
app.use(express.static( __dirname + '/public'));


//
app.get('/', function (req, res) {
  MongoClient.connect(mongoURL, function (err, db) {
    const robots = db.collection('robots');
    robots.find({}).toArray(function (err, docs) {
      res.render('index', {robots: docs})
      })
    })
});

//app.get('/', function(req, res){
//  res.sendFile(path.join(__dirname + '/index.mustache'));

app.get('/unemployed', function (req, res) {
  MongoClient.connect(mongoURL, function (err, db) {
    const robots = db.collection('robots');
    robots.find({"job": null}).toArray(function (err, docs) {
      res.render("unemployed", {robots: docs})
    })
  })
});



app.get('/employed', function (req, res) {
  MongoClient.connect(mongoURL, function (err, db) {
    const robots = db.collection('robots');
    robots.find({"job": {$nin: [null]}}).toArray(function (err, docs) {
      res.render("employed", {robots: docs})
    })
  })
})


//app.use('/', function (req, res) {
//  MongoClient.connect(mongoURL, function (err, db) {
//    const robots = db.collection('robots');
//    robots.find({}).toArray(function (err, docs) {
//      res.render("index", {robots: docs})
//    })
//  })
//})

//app.get('/', function (req, res) {
//  res.render('index', {robots: data.robots});
//});

//app.get('/:username', function (req, res) {
//  var user = data.robots.find(function(x) {
//    return x.username === req.params.username
//  });
//  res.render('robots', {user: user});
//});






app.listen(3000, function () {
  console.log('Successfully started express application!');
});

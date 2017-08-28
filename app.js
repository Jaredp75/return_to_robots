const express = require('express');
const path = require('path');
const mustacheExpress = require('mustache-express');
const mustache = require('mustache');
const mongodb = require('mongodb');
const data = require('./data.js');
//var bodyParser = require('body-parser');

const app = express();

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');
app.use(express.static( __dirname + '/public'));


//Listening on root
app.get('/users', function (req, res) {
      res.render('users', data)
});

//app.get('/', function(req, res){
//  res.sendFile(path.join(__dirname + '/index.mustache'));





app.listen(3000, function () {
  console.log('Successfully started express application!');
});

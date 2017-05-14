// Module Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const dotenv = require('dotenv');
const sass = require('node-sass-middleware');
const path = require('path');
const compression = require('compression');
const jsonFile = require('jsonfile');
const querystring = require('querystring');
const unirest = require("unirest");
const fileName = 'themoviedb_data.json'
const jsonDataFile = require('./public/themoviedb_data.json')


// Controllers(route handlers)
const homeController = require('./controllers/home');

// Create Express Server
const app = express();

// API Configuration




function getMovieResults(){

  var req = unirest("GET", "https://api.themoviedb.org/3/movie/top_rated");

  req.query({
    "page": "1",
    "language": "en-US",
    "api_key": "de40ed8ad2ee7f6ced4aba14c513ab23"
  });

    req.send("{}");

  req.end(function (res) {
    if (res.error) throw new Error(res.error);
    // do something with the data
  });

}

// Express Configuration

app.set('port', 3001)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(compression());
app.use(sass({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public')
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public'), { maxAge: 31557600000 }));


// Primary App Routes
app.get('/', function(req, res){
  console.log(getMovieResults());
  res.render('home')
  var titleArr = [];
  var descriptionArr = []
  var jsonData =jsonDataFile.results
  for (var i = 0; i < jsonData.length; i++) {
    titleArr.push(jsonData[i].title)
    descriptionArr.push(jsonData[i].overview)
  }
  res.render('home', { title: 'Home', titleArray: getMovieResults(), descriptionArray: descriptionArr })

})

//Start Express Server

app.listen(app.get('port'), () => {
  console.log('Your app is running at http://localhost:3001 in development mode', chalk.green('✓'), app.get('port'), app.get('env'));
  console.log('To quit Ctrl-C');

  var titleArr = [];
  var descriptionArr = [];
  var jsonData =jsonDataFile.results
  for (var i = 0; i < jsonData.length; i++) {
    titleArr.push(jsonData[i].title)
    descriptionArr.push(jsonData[i].overview)
  }
  console.log(titleArr);

})

module.exports = app;

//jshint esversion:6
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const https = require("https");
const getNews = require(__dirname + "/home.js");
const getAppleNews = require(__dirname + "/apple.js");
const getBitcoinNews =  require(__dirname + "/bitcoin.js");
const getTechNews = require(__dirname + "/tech.js");
const getCountryNews = require(__dirname + "/nations.js");


app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');
app.engine('html', require("ejs").renderFile);


app.get('/', function(req, res){
  res.sendFile(__dirname + "/login.html");
});


app.post('/', function(req, res){
  res.redirect("/home");
});


app.get("/home", function(req, res){
  getNews.add(req, res);
});

app.get("/appleNews", function(req, res){
  getAppleNews.getApple(req, res);
});

app.post("/appleNews", function(req, res){
  let preferLanguage = req.body.selectlanguage;
  let preferDateFrom = req.body.dateFrom;
  let preferDateto = req.body.dateTo;
  let preferSort = req.body.sorting;
  getAppleNews.getAppleCustom(req, res, preferLanguage,preferDateFrom, preferDateto, preferSort);
});

app.get("/bitcoinNews", function(req, res){
  getBitcoinNews.getBitcoin(req, res);
});

app.post("/bitcoinNews", function(req, res){
  let preferLanguage = req.body.selectlanguage;
  let preferDateFrom = req.body.dateFrom;
  let preferDateto = req.body.dateTo;
  let preferSort = req.body.sorting;
  getBitcoinNews.getCustomBitcoin(req, res, preferLanguage,preferDateFrom, preferDateto, preferSort);
});

app.get("/techNews", function(req, res){
  getTechNews.getTech(req, res);
});


app.post("/techNews", function(req, res){
  let preferSort = req.body.sorting;
  getTechNews.getTechCustom(req, res, preferSort);
});


app.get("/country", function(req, res){
  getCountryNews.getCountry(req, res);
});

app.post("/country", function(req, res){
  let preferCountry = req.body.countryValue;
  getCountryNews.getCustomCountry(req, res, preferCountry);
});


app.listen(process.env.PORT || "3000", function() {
  console.log("server listening on 3000");
});

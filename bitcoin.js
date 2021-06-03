//jshint esversion:6

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const https = require("https");

var bitcoinHeaderList = [];
var bitcoinDescriptionList = [];
var bitcoinImagesList = [];


/*default date*/
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd;

var from = today;
var to = today;

/*default date*/


/*sort by*/

var defaultSort = "popularity";

/*sortby*/

/*languange*/

var language = "en";

/*languange*/

var bitcoinURL = "https://newsapi.org/v2/everything?q=bitcoin&from=" + today.toString() + "&to=" + today.toString() + "&sortBy=" + defaultSort + "&language=" + language + "&apiKey=9ba8e05539c749ba929990a97631997d";


module.exports.getBitcoin =
  function(req, res) {
    console.log(bitcoinURL);
    https.get(bitcoinURL, function(response) {
      console.log(response.statusCode);
      let chunks = "";
      response.on('data', function(data) {
        chunks += data;
      });

      response.on("end", function() {
        let News = JSON.parse(chunks);
        if (News.totalResults < 10) {
          for (let i = 0; i < News.totalResults; i++) {
            let bitcoinNewsHeader = News.articles[i].title;
            let bitcoinNewsDescription = News.articles[i].description;
            let bitcoinNewsImage = News.articles[i].urlToImage;
            bitcoinHeaderList.push(bitcoinNewsHeader);
            bitcoinDescriptionList.push(bitcoinNewsDescription);
            bitcoinImagesList.push(bitcoinNewsImage);
          }
        } else if (News.totalResults === 0) {
          bitcoinHeaderList.push("Sorry Not Found Anything. Try Another");
        } else {
          for (let i = 0; i < 10; i++) {
            let bitcoinNewsHeader = News.articles[i].title;
            let bitcoinNewsDescription = News.articles[i].description;
            let bitcoinNewsImage = News.articles[i].urlToImage;
            bitcoinHeaderList.push(bitcoinNewsHeader);
            bitcoinDescriptionList.push(bitcoinNewsDescription);
            bitcoinImagesList.push(bitcoinNewsImage);
          }
        }



        setTimeout(function() {
          res.render("bitcoin.ejs", {
            bitcoinHeader: bitcoinHeaderList,
            bitcoinDescription: bitcoinDescriptionList,
            bitcoinImages: bitcoinImagesList
          });
        }, 10000);


      });
    });
  };



module.exports.getCustomBitcoin = function(req, res, preferLanguage, preferDateFrom, preferDateto, preferSort) {

  if (preferLanguage === undefined || preferLanguage === "") {
    preferLanguage = "en";
  }

  if (preferDateFrom === undefined || preferDateFrom === "") {
    preferDateFrom = from;
  }

  if (preferDateto === undefined || preferDateto === "") {
    preferDateto = to;
  }

  if (preferSort === undefined || preferSort === "") {
    preferSort = "popularity";
  }

  let customBitcoinURL = "https://newsapi.org/v2/everything?q=bitcoin&from=" + preferDateFrom + "&to=" + preferDateto + "&sortBy=" + preferSort + "&language=" + preferLanguage + "&apiKey=9ba8e05539c749ba929990a97631997d";
  console.log(customBitcoinURL);
  let customHeaderList = [];
  let customDescriptionList = [];
  let customImagesList = [];

  https.get(customBitcoinURL, function(response) {
    let chunks = "";
    response.on('data', function(data) {
      chunks += data;
    });

    response.on("end", function() {
      let News = JSON.parse(chunks);
      if (News.totalResults < 10) {
        for (var i = 0; i < News.totalResults; i++) {
          let bitcoinNewsHeader = News.articles[i].title;
          let bitcoinNewsDescription = News.articles[i].description;
          let bitcoinNewsImage = News.articles[i].urlToImage;
          customHeaderList.push(bitcoinNewsHeader);
          customDescriptionList.push(bitcoinNewsDescription);
          customImagesList.push(bitcoinNewsImage);
        }
      } else if (News.totalResults === 0) {
        customHeaderList.push("Sorry Not Found Anything. Try Another");
        console.log(News);
      } else {
        for (let i = 0; i < 10; i++) {
          let bitcoinNewsHeader = News.articles[i].title;
          let bitcoinNewsDescription = News.articles[i].description;
          let bitcoinNewsImage = News.articles[i].urlToImage;
          customHeaderList.push(bitcoinNewsHeader);
          customDescriptionList.push(bitcoinNewsDescription);
          customImagesList.push(bitcoinNewsImage);
        }
      }


      setTimeout(function() {
        res.render("bitcoinFilter.ejs", {
          customBitcoinHeader: customHeaderList,
          customBitcoinDescription: customDescriptionList,
          customBitcoinImages: customImagesList
        });
      }, 10000);



    });
  });
};

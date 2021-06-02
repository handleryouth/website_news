//jshint esversion:6

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const https = require("https");

var appleHeaderList = [];
var appleDescriptionList = [];
var appleImagesList = [];


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

var appleURL = "https://newsapi.org/v2/everything?q=apple&from=" + from.toString() + "&to=" + to.toString() + "&sortBy=" + defaultSort + "&language=" + language + "&apiKey=1c13c715ec12463cbd624e2005e0f66f";


module.exports.getApple = function(req, res) {
  https.get(appleURL, function(response) {
    console.log(response.statusCode);
    let chunks = "";
    response.on('data', function(data) {
      chunks += data;
    });

    response.on("end", function() {
      let News = JSON.parse(chunks);
      if (News.totalResults < 10) {
        for (let i = 0; i < News.totalResults; i++) {
          let appleNewsHeader = News.articles[i].title;
          let appleNewsDescription = News.articles[i].description;
          let appleNewsImage = News.articles[i].urlToImage;
          appleHeaderList.push(appleNewsHeader);
          appleDescriptionList.push(appleNewsDescription);
          appleImagesList.push(appleNewsImage);
        }
      } else {
        for (let i = 0; i < 10; i++) {
          let appleNewsHeader = News.articles[i].title;
          let appleNewsDescription = News.articles[i].description;
          let appleNewsImage = News.articles[i].urlToImage;
          appleHeaderList.push(appleNewsHeader);
          appleDescriptionList.push(appleNewsDescription);
          appleImagesList.push(appleNewsImage);
        }
      }


      setTimeout(function() {
        res.render("apple.ejs", {
          appleHeader: appleHeaderList,
          appleDescription: appleDescriptionList,
          appleImages: appleImagesList
        });
      }, 10000);


    });
  });


};

module.exports.getAppleCustom = function(req, res, preferLanguage, preferDateFrom, preferDateto, preferSort) {

  console.log(preferLanguage);
  if (preferLanguage === undefined || preferLanguage === "") {
    preferLanguage = "en";
  }

  console.log(preferDateFrom);
  if (preferDateFrom === undefined || preferDateFrom === "") {
    preferDateFrom = from;
  }

  console.log(preferDateto);
  if (preferDateto === undefined || preferDateto === "") {
    preferDateto = to;
  }


  console.log(preferSort);
  if (preferSort === undefined || preferSort === "") {
    preferSort = "popularity";
  }

  let customAppleURL = "https://newsapi.org/v2/everything?q=apple&from=" + preferDateFrom + "&to=" + preferDateto + "&sortBy=" + preferSort + "&language=" + preferLanguage + "&apiKey=1c13c715ec12463cbd624e2005e0f66f";
  console.log(customAppleURL);
  var customHeaderList = [];
  var customDescriptionList = [];
  var customImagesList = [];

  https.get(customAppleURL, function(response) {
    let chunks = "";
    response.on('data', function(data) {
      chunks += data;
    });

    response.on("end", function() {
      let News = JSON.parse(chunks);
      if (News.totalResults < 10) {
        for (let i = 0; i < News.totalResults; i++) {
          let appleNewsHeader = News.articles[i].title;
          let appleNewsDescription = News.articles[i].description;
          let appleNewsImage = News.articles[i].urlToImage;
          customHeaderList.push(appleNewsHeader);
          customDescriptionList.push(appleNewsDescription);
          customImagesList.push(appleNewsImage);
        }
      } else if (News.totalResults === 0) {
        customHeaderList.push("Sorry not found anything !");
      } else {
        for (let i = 0; i < 10; i++) {
          let appleNewsHeader = News.articles[i].title;
          let appleNewsDescription = News.articles[i].description;
          let appleNewsImage = News.articles[i].urlToImage;
          customHeaderList.push(appleNewsHeader);
          customDescriptionList.push(appleNewsDescription);
          customImagesList.push(appleNewsImage);
        }
      }
      console.log(customHeaderList.length);

      setTimeout(function() {
        res.render("appleFilter.ejs", {
          customappleHeader: customHeaderList,
          customappleDescription: customDescriptionList,
          customappleImages: customImagesList
        });
      }, 10000);


    });
  });

};

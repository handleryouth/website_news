//jshint esversion:6

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const https = require("https");

var techHeaderList = [];
var techDescriptionList = [];
var techImagesList = [];

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

var techURL = "https://newsapi.org/v2/everything?domains=techcrunch.com,thenextweb.com&from=" + from.toString() + "&to=" + to.toString() + "&sortBy=" + defaultSort + "&language=" + language + "&apiKey=1c13c715ec12463cbd624e2005e0f66f";

module.exports.getTech =
  function(req, res) {
    console.log(techURL);
    https.get(techURL, function(response) {
      console.log(response.statusCode);
      let chunks = "";
      response.on('data', function(data) {
        chunks += data;
      });

      response.on("end", function() {
        let News = JSON.parse(chunks);
        if (News.totalResults < 10) {
          for (let i = 0; i < News.totalResults; i++) {
            let techNewsHeader = News.articles[i].title;
            let techNewsDescription = News.articles[i].description;
            let techNewsImage = News.articles[i].urlToImage;
            techHeaderList.push(techNewsHeader);
            techDescriptionList.push(techNewsDescription);
            techImagesList.push(techNewsImage);
          }
        } else if (News.totalResults === 0) {
          techHeaderList.push("Sorry, not found anything!");
        } else {
          for (let i = 0; i < 10; i++) {
            let techNewsHeader = News.articles[i].title;
            let techNewsDescription = News.articles[i].description;
            let techNewsImage = News.articles[i].urlToImage;
            techHeaderList.push(techNewsHeader);
            techDescriptionList.push(techNewsDescription);
            techImagesList.push(techNewsImage);
          }
        }

        setTimeout(function() {
          res.render("tech.ejs", {
            techHeader: techHeaderList,
            techDescription: techDescriptionList,
            techImages: techImagesList
          });
        }, 10000);


      });
    });


  };


module.exports.getTechCustom = function(req, res, preferSort) {

  if (preferSort === undefined || preferSort === "") {
    preferSort = "popularity";
  }

  let customTechURL = "https://newsapi.org/v2/everything?domains=techcrunch.com,thenextweb.com&sortBy=" + preferSort + "&apiKey=1c13c715ec12463cbd624e2005e0f66f";

  console.log(customTechURL);
  var customHeaderList = [];
  var customDescriptionList = [];
  var customImagesList = [];

  https.get(customTechURL, function(response) {
    let chunks = "";
    response.on('data', function(data) {
      chunks += data;
    });

    response.on("end", function() {
      let News = JSON.parse(chunks);
      if (News.totalResults < 10) {
        for (let i = 0; i < News.totalResults; i++) {
          let techNewsHeader = News.articles[i].title;
          let techNewsDescription = News.articles[i].description;
          let techNewsImage = News.articles[i].urlToImage;
          customHeaderList.push(techNewsHeader);
          customDescriptionList.push(techNewsDescription);
          customImagesList.push(techNewsImage);
        }
      } else if (News.totalResults === 0) {
        customHeaderList.push("Sorry, not found anything!");
      } else {
        for (let i = 0; i < 10; i++) {
          let techNewsHeader = News.articles[i].title;
          let techNewsDescription = News.articles[i].description;
          let techNewsImage = News.articles[i].urlToImage;
          customHeaderList.push(techNewsHeader);
          customDescriptionList.push(techNewsDescription);
          customImagesList.push(techNewsImage);
        }
      }


      setTimeout(function() {
        res.render("techFilter.ejs", {
          customTechHeader: customHeaderList,
          customTechDescription: customDescriptionList,
          customTechImages: customImagesList
        });
      }, 10000);


    });
  });

};

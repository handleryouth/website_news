//jshint esversion:6

const express = require('express');
const app = express();
const https = require("https");

var customHeaderList = [];
var customDescriptionList = [];
var customImagesList = [];


module.exports.customSearch = function(req, res, query) {
  let customURL = "https://newsapi.org/v2/everything?q=" + query + "&apiKey=9ba8e05539c749ba929990a97631997d";


  https.get(customURL, function(response) {
    console.log(response.statusCode);
    console.log(customURL);
    let chunks = "";
    response.on('data', function(data) {
      chunks += data;
    });

    response.on("end", function() {
      let News = JSON.parse(chunks);
      console.log(News);
      console.log(News.totalResults);
      if (News.totalResults <= 10 && News.totalResults >= 1) {
        for (let i = 0; i < News.totalResults; i++) {
          let customNewsHeader = News.articles[i].title;
          let customNewsDescription = News.articles[i].description;
          let customNewsImage = News.articles[i].urlToImage;
          customHeaderList.push(customNewsHeader);
          customDescriptionList.push(customNewsDescription);
          customImagesList.push(customNewsImage);
        }
      }
        else if(News.totalResults > 10){
          for (let i = 0; i < 10; i++) {
            let customNewsHeader = News.articles[i].title;
            let customNewsDescription = News.articles[i].description;
            let customNewsImage = News.articles[i].urlToImage;
            customHeaderList.push(customNewsHeader);
            customDescriptionList.push(customNewsDescription);
            customImagesList.push(customNewsImage);
          }
        }

      else if (News.totalResults === 0) {
        customHeaderList.push("Nothing, sorry.");
      }

      setTimeout(function() {
        res.render("search.ejs", {
          customHeader: customHeaderList,
          customDescription: customDescriptionList,
          customImages: customImagesList
        });
      }, 10000);

    });
  });


};

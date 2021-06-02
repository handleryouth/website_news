//jshint esversion:6

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const https = require("https");

module.exports.getCountry =
  function(req, res) {

    let country = "us";
    let countryURL = "https://newsapi.org/v2/sources?country=" + country + "&apiKey=1c13c715ec12463cbd624e2005e0f66f";

    let sourceHeaderList = [];
    let sourceDescriptionList = [];
    let sourceLinkList = [];


    https.get(countryURL, function(response) {
      console.log(response.statusCode);
      let chunks = "";
      response.on('data', function(data) {
        chunks += data;
      });

      response.on("end", function() {
        let News = JSON.parse(chunks);
        for (var i = 0; i < 10; i++) {
          let sourceName = News.sources[i].name;
          let sourceDescription = News.sources[i].description;
          let sourceLink = News.sources[i].url;
          sourceHeaderList.push(sourceName);
          sourceDescriptionList.push(sourceDescription);
          sourceLinkList.push(sourceLink);
        }

        setTimeout(function afterTwoSeconds() {
          res.render("nations.ejs", {
            srcName: sourceHeaderList,
            srcDescription: sourceDescriptionList,
            srcLink: sourceLinkList
          });
        }, 10000);


      });
    });


  };



module.exports.getCustomCountry =
  function(req, res, preferCountry) {

    if (preferCountry === undefined || preferCountry === "") {
      preferCountry = "us";
    }

    let sourceHeaderList = [];
    let sourceDescriptionList = [];
    let sourceLinkList = [];

    let countryURL = "https://newsapi.org/v2/sources?country=" + preferCountry + "&apiKey=1c13c715ec12463cbd624e2005e0f66f";
    console.log(countryURL);
    https.get(countryURL, function(response) {
      console.log(response.statusCode);
      let chunks = "";
      response.on('data', function(data) {
        chunks += data;
      });

      response.on("end", function() {
        let News = JSON.parse(chunks);
        if (News.sources.length === 0) {
          sourceHeaderList.push("Sorry not any header !");
          sourceDescriptionList.push("Sorry not found any description !");


          setTimeout(function afterTwoSeconds() {
            res.render("nationsFilter.ejs", {
              customsrcName: sourceHeaderList,
              customsrcDescription: sourceDescriptionList,
              customsrcLink: sourceLinkList
            });
          }, 10000);


        } else if (News.sources.length < 10 && News.sources.length >= 1) {
          for (let i = 0; i < News.sources.length; i++) {
            let sourceName = News.sources[i].name;
            let sourceDescription = News.sources[i].description;
            let sourceLink = News.sources[i].url;
            sourceHeaderList.push(sourceName);
            sourceDescriptionList.push(sourceDescription);
            sourceLinkList.push(sourceLink);
          }

          setTimeout(function() {
            res.render("nationsFilter.ejs", {
              customsrcName: sourceHeaderList,
              customsrcDescription: sourceDescriptionList,
              customsrcLink: sourceLinkList
            });
          }, 2000);


        } else {
          for (let i = 0; i < 10; i++) {
            console.log(News.sources[0].name);
            let sourceName = News.sources[i].name;
            let sourceDescription = News.sources[i].description;
            let sourceLink = News.sources[i].url;
            sourceHeaderList.push(sourceName);
            sourceDescriptionList.push(sourceDescription);
            sourceLinkList.push(sourceLink);
          }


          setTimeout(function() {
            res.render("nationsFilter.ejs", {
              customsrcName: sourceHeaderList,
              customsrcDescription: sourceDescriptionList,
              customsrcLink: sourceLinkList
            });
          }, 10000);

        }

      });
    });


  };

//jshint esversion:6
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const https = require("https");


var topNewsHeaderList = [];
var topNewsDescriptionList = [];
var topNewsImagesList = [];

var anotherNewsHeader = [];
var anotherNewsDescription = [];
var anotherNewsImages = [];


var businessNewsHeader = [];
var businessNewsDescription = [];
var businessNewsImages = [];

var entertainmentNewsHeader = [];
var entertainmentNewsDescription = [];
var entertainmentNewsImages = [];


var healthNewsHeader = [];
var healthNewsDescription = [];
var healthNewsImages = [];


var scienceNewsHeader = [];
var scienceNewsDescription = [];
var scienceNewsImages = [];

var sportNewsHeader = [];
var sportNewsDescription = [];
var sportNewsImages = [];

var technologyNewsHeader = [];
var technologyNewsDescription = [];
var technologyNewsImages = [];


const urlTopNews = "https://newsapi.org/v2/top-headlines?country=us&apiKey=3f28d3b8dce948178d91452c4a02c4a0";
const urlAnotherNews = "https://newsapi.org/v2/top-headlines?country=us&apiKey=3f28d3b8dce948178d91452c4a02c4a0";
const urlbasedCategory = "https://newsapi.org/v2/top-headlines?country=us&apiKey=3f28d3b8dce948178d91452c4a02c4a0&category=";


/*top news*/
module.exports.add =
  async function(req, res) {
    https.get(urlTopNews, function(response) {
      let chunks = "";
      response.on('data', function(data) {
        chunks += data;
      });
      response.on('end', function() {
        let News = JSON.parse(chunks);
        for (var i = 0; i < 5; i++) {
          let topNewHeader = News.articles[i].title;
          let topNewDescription = News.articles[i].description;
          let topNewsImage = News.articles[i].urlToImage;
          topNewsHeaderList.push(topNewHeader);
          topNewsDescriptionList.push(topNewDescription);
          topNewsImagesList.push(topNewsImage);
        }
      });
    });

    /*top news*/

    /*another news*/

    https.get(urlAnotherNews, function(response) {
      let chunks = "";
      response.on('data', function(data) {
        chunks += data;
      });

      response.on("end", function() {
        let News = JSON.parse(chunks);
        for (var i = 3; i < 6; i++) {
          let topNewHeader = News.articles[i].title;
          let topNewDescription = News.articles[i].description;
          let topNewsImage = News.articles[i].urlToImage;
          anotherNewsHeader.push(topNewHeader);
          anotherNewsDescription.push(topNewDescription);
          anotherNewsImages.push(topNewsImage);
        }

      });
    });

    /*another news*/

    /*news based on type (business)*/
    https.get(urlbasedCategory + "business", function(response) {
      let chunks = "";
      response.on('data', function(data) {
        chunks += data;
      });

      response.on("end", function() {
        let News = JSON.parse(chunks);
        for (var i = 0; i < 5; i++) {
          let topNewHeader = News.articles[i].title;
          let topNewDescription = News.articles[i].description;
          let topNewsImage = News.articles[i].urlToImage;
          businessNewsHeader.push(topNewHeader);
          businessNewsDescription.push(topNewDescription);
          businessNewsImages.push(topNewsImage);
        }
      });
    });

    /*news based on type business*/


    /*news based on type (entertainment)*/
    https.get(urlbasedCategory + "entertainment", function(response) {
      let chunks = "";
      response.on('data', function(data) {
        chunks += data;
      });

      response.on("end", function() {
        let News = JSON.parse(chunks);
        for (var i = 0; i < 5; i++) {
          let topNewHeader = News.articles[i].title;
          let topNewDescription = News.articles[i].description;
          let topNewsImage = News.articles[i].urlToImage;
          entertainmentNewsHeader.push(topNewHeader);
          entertainmentNewsDescription.push(topNewDescription);
          entertainmentNewsImages.push(topNewsImage);
        }
      });
    });


    /*news based on type entertainment*/


/*news based on general*/

    https.get(urlbasedCategory + "health", function(response) {
      let chunks = "";
      response.on('data', function(data) {
        chunks += data;
      });

      response.on("end", function() {
        let News = JSON.parse(chunks);
        for (var i = 0; i < 5; i++) {
          let topNewHeader = News.articles[i].title;
          let topNewDescription = News.articles[i].description;
          let topNewsImage = News.articles[i].urlToImage;
          healthNewsHeader.push(topNewHeader);
          healthNewsDescription.push(topNewDescription);
          healthNewsImages.push(topNewsImage);
        }
      });
    });

/*news based on general*/


/*news based on science*/
https.get(urlbasedCategory + "science", function(response) {
  let chunks = "";
  response.on('data', function(data) {
    chunks += data;
  });

  response.on("end", function() {
    let News = JSON.parse(chunks);
    for (var i = 0; i < 5; i++) {
      let topNewHeader = News.articles[i].title;
      let topNewDescription = News.articles[i].description;
      let topNewsImage = News.articles[i].urlToImage;
      scienceNewsHeader.push(topNewHeader);
      scienceNewsDescription.push(topNewDescription);
      scienceNewsImages.push(topNewsImage);
    }
  });
});

/*news based on science*/


/*news based on sports*/
https.get(urlbasedCategory + "sports", function(response) {
  let chunks = "";
  response.on('data', function(data) {
    chunks += data;
  });

  response.on("end", function() {
    let News = JSON.parse(chunks);
    for (var i = 0; i < 5; i++) {
      let topNewHeader = News.articles[i].title;
      let topNewDescription = News.articles[i].description;
      let topNewsImage = News.articles[i].urlToImage;
      sportNewsHeader.push(topNewHeader);
      sportNewsDescription.push(topNewDescription);
      sportNewsImages.push(topNewsImage);
    }
  });
});

/*news based on sports*/


/*news based on tech*/
https.get(urlbasedCategory + "technology", function(response) {
  let chunks = "";
  response.on('data', function(data) {
    chunks += data;
  });

  response.on("end", function() {
    let News = JSON.parse(chunks);
    for (var i = 0; i < 5; i++) {
      let topNewHeader = News.articles[i].title;
      let topNewDescription = News.articles[i].description;
      let topNewsImage = News.articles[i].urlToImage;
      technologyNewsHeader.push(topNewHeader);
      technologyNewsDescription.push(topNewDescription);
      technologyNewsImages.push(topNewsImage);
    }
  });
});

/*news based on tech*/


setTimeout(function afterTwoSeconds() {
  res.render("index1", {
    headerList: topNewsHeaderList,
    descriptionList: topNewsDescriptionList,
    imagesList: topNewsImagesList,

    anotherHead: anotherNewsHeader,
    anotherDesc: anotherNewsDescription,
    anotherImg: anotherNewsImages,

    businessHead: businessNewsHeader,
    businessDescription: businessNewsDescription,
    businessImages: businessNewsImages,

    entertainmentHead : entertainmentNewsHeader,
    entertainmentDescription: entertainmentNewsDescription,
    entertainmentImages: entertainmentNewsImages,

    healthHead: healthNewsHeader,
    healthDescription: healthNewsDescription,
    healthImages: healthNewsImages,

    scienceHead: scienceNewsHeader,
    scienceDescription: scienceNewsDescription,
    scienceImages: scienceNewsImages,

    sportHead: sportNewsHeader,
    sportDescription: sportNewsDescription,
    sportImages: sportNewsImages,

    technologyHead: technologyNewsHeader,
    technologyDescription: technologyNewsDescription,
    technologyImages: technologyNewsImages,

  });
}, 10000);

  };

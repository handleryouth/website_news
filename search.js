//jshint esversion:6


const https = require("https");


module.exports.customSearch = function(req, res, query) {
  let customURL = "https://newsapi.org/v2/everything?q=" + query + "&apiKey=1c13c715ec12463cbd624e2005e0f66f&pageSize=10";

  var customHeaderList = [];
  var customDescriptionList = [];
  var customImagesList = [];


  https.get(customURL, function(response) {
    console.log(response.statusCode);
    let chunks = "";
    response.on('data', function(data) {
      chunks += data;
    });

    response.on("end", function() {
      let News = JSON.parse(chunks);
      if (News.totalResults <= 10) {
        for (let i = 0; i < News.totalResults; i++) {
          let customNewsHeader = News.articles[i].title;
          let customNewsDescription = News.articles[i].description;
          let customNewsImage = News.articles[i].urlToImage;
          customHeaderList.push(customNewsHeader);
          customDescriptionList.push(customNewsDescription);
          customImagesList.push(customNewsImage);
        }

        setTimeout(function(){
          res.render("search.ejs", {
            customHeader : customHeaderList,
            customDescription : customDescriptionList,
            customImages : customImagesList
          });
        }, 10000);

      }

      else if(News.totalResults === 0){
        customHeaderList.push("Nothing, sorry :(");
        setTimeout(function(){
          res.render("search.ejs", {
            customHeader : customHeaderList,
            customDescription : customDescriptionList,
            customImages : customImagesList
          });
        }, 10000);

      }


    });
  });
};

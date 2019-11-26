require("dotenv").config();
var axios = require("axios");
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);


axios.get("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy").then(
  function(response) {
    console.log("The movie's rating is: " + response.data.imdbRating);
  })
var spotify = {
    provider: "spotify",
    apiKey: "ecab0bec1b9142ac910f8859ef8b6f58"
  };
  var bandsintown = {
    provider: "bandsintown",
    apiKey: "4abed1e6cf7aa9ccfe2a41418ef40917."
  };


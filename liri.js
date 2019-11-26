require("dotenv").config();
var axios = require("axios");
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var argv = process.argv;

for(var i = 2; i < argv.length; i++){
    if(argv[i] == concert-this){

    }else if(argv[i] == spotify-this-song){

    }else if(argv[i] == movie-this){

    }else if(argv[i] == do-what-it-says){

    }else{
        console.log("Sorry this request cannot be made.");
    }
}

axios.get("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy").then(
  function(response) {
    console.log("The movie's rating is: " + response.data.imdbRating);
  })



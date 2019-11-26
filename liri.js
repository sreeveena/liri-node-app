require("dotenv").config();
var axios = require("axios");
var keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify);
var nodeA = process.argv;
var name = "";
var request = nodeA[2].toLowerCase();

function getName(){
    for( var i=3; i<nodeA.length; i++){
        if(i>3 && i< nodeA.length){
            name = name + " " + nodeA[i];
        }else{
            name += nodeA[i];
        }
    
    }
}

function getRottenTomatoesRating(rating){
    for(var i=0; i<rating.length; i++){
        if(rating[i].Source == "Rotten Tomatoes"){
            return rating[i].Value;
        }
    }
return "0%";
}
// for(var i = 2; i < argv.length; i++){
    if(request == "concert-this"){

    }else if(request == "spotify-this-song"){

    }else if(request == "movie-this"){
        getName();
        var queryUrl = "http://www.omdbapi.com/?t=" + name + "&y=&plot=short&apikey=trilogy";
        axios.get(queryUrl).then(
            function(response) {
              console.log("Title of the movie is: " + response.data.Title);
              console.log("Year the movie came out: " + response.data.Year);
              console.log("IMDB Rating of the movie: " + response.data.imdbRating);
              console.log("Rotten Tomatoes Rating of the movie: " + getRottenTomatoesRating(response.data.Ratings));
              console.log("Country where the movie was produced: " + response.data.Country);
              console.log("Language of the movie: " + response.data.Language);
              console.log("Plot of the movie: " + response.data.Plot);
              console.log("Actors in the movie: " + response.data.Actors);
            });
    }else if(request == "do-what-it-says"){

    }else{
        console.log("Sorry this request cannot be made.");
    }
// }





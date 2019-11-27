require("dotenv").config();
var axios = require("axios");
var keys = require("./keys.js");
var moment = require('moment');
moment().format();
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var fs = require("fs");
var nodeA = process.argv;
var name = "";
//this variable will have user request 
var request;

//this function will get the user input value which represents the movie name
//or band name 
function getName(){
    for( var i=3; i<nodeA.length; i++){
        if(i>3 && i< nodeA.length){
            name = name + " " + nodeA[i];
        }else{
            name += nodeA[i];
        }
    }
}

// this function will return the rotten tomatoes movie rating from http://www.omdbapi.com/
function getRottenTomatoesRating(rating){
    for(var i=0; i<rating.length; i++){
        if(rating[i].Source == "Rotten Tomatoes"){
            return rating[i].Value;
        }
    }
return "0%";
}
//this function will get concert details from bandsintown site
function getConcertInfo(name){
    if(name == ""){
        name = "Billie Eilish";
    }
    var queryUrl = "http://rest.bandsintown.com/artists/" + name + "/events?app_id=codingbootcamp";   
    axios.get(queryUrl).then(
    function(response) {
        for( var i =0; i<response.data.length; i++){
            console.log("Name of the venue: " + response.data[i].venue.name);
            console.log("Venue location: " + response.data[i].venue.city + " "
                + response.data[i].venue.region + " " + response.data[i].venue.country);
            console.log("Date of the Event: " +  moment(response.data[i].datetime).format('MM/DD/YYYY')); 
        }
        
    });
}
//This function will get songs information from spotify website.
function getSongInfo(name){
    if(name == ""){
        name = "The Sign";
    }
    spotify.search({ type: 'track', query: "track:" + name, limit: 20}, function(err, data) {
    if (err) {
        return console.log('Error occurred: ' + err);
    }
    for( var i = 0; i < data.tracks.items.length; i++){
        // console.log(data.tracks.items[i].name);
        if(data.tracks.items[i].name == name){
            console.log("Artist(s):");
            console.log(data.tracks.items[i].artists[0].name);
            console.log("The song's name:");
            console.log(data.tracks.items[i].name);
            console.log("A preview link of the song from Spotify:");
            console.log(data.tracks.items[i].preview_url);
            console.log("The album that the song is from:");
            console.log(data.tracks.items[i].album.name);
            break;
        }
    }
                    
   });  
    
}
//This function will get movie details from imdb
function getMovieInfo(name){
    if(name == ""){
        name = "Mr. Nobody";
        console.log("If you haven't watched Mr. Nobody, then you should: http://www.imdb.com/title/tt0485947/");
        console.log("It's on Netflix!");
    }
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
    
}
console.log(nodeA[3]);
if(typeof nodeA[2] != 'undefined'){
    request = nodeA[2].toLowerCase();
}
 // this if else conditions are to check what the user request is and give the appropriate result
    if(request == "concert-this"){
        getName();
        getConcertInfo(name);
        
    }else if(request == "spotify-this-song"){
        getName();
        getSongInfo(name);
        
    }else if(request == "movie-this"){
        getName();
        getMovieInfo(name);
    }else if(request == "do-what-it-says"){
        var randomN = Math.floor(Math.random()*19)+1;
        fs.readFile("random.txt", "utf8", function(err,data){
            if(err){
                return console.log(err); 
            }
            var dataArr = data.split("\n");
            var line = dataArr[randomN];
            var lineArr = line.split(",");
            console.log (lineArr[0]);
            console.log(lineArr[1]);
            request = lineArr[0];
            name = lineArr[1];
            if(request == "concert-this"){
                getConcertInfo(name);
                
            }else if(request == "spotify-this-song"){
                getSongInfo(name);
                
            }else if(request == "movie-this"){
                getMovieInfo(name);
            }
        });

    }else{
        console.log("Sorry this request cannot be made.");
    }






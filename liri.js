require("dotenv").config();
var axios = require("axios");
var keys = require("./keys.js");
var moment = require('moment');
moment().format();
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var nodeA = process.argv;
var name = "";
//this variable will have user request 
var request = nodeA[2].toLowerCase();
/*
var SpotifyWebApi = require('spotify-web-api-node');
var spotifyApi = new SpotifyWebApi({
    clientId: 'ecab0bec1b9142ac910f8859ef8b6f58',
    clientSecret: '69359b9034d84ac89ca5beb3afb06cf8',
    redirectUri: 'http://www.example.com/callback'
  });
*/
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

 // this if else conditions are to check what the user request is and give the appropriate result
    if(request == "concert-this"){
        getName();
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
    }else if(request == "spotify-this-song"){
        // JSON data format from Spotify website:
        // { 
        //    album: { name: 'album-name', ...},
        //    artists: [ { name: 'name', ...}, 
        //               { name: 'name', ...}],
        //    preview_url: 'https://...',
        //    name: 'song-name',
        //    ...
        // //}
        getName();
        if(name == ""){
            name = "The Sign";
        }
        spotify.search({ type: 'track', query: "track:" + name, limit: 20}, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        for( var i = 0; i < data.tracks.items.length; i++){
            if(data.tracks.items[i].name == "The Sign"){
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
        
        
    }else if(request == "movie-this"){
        if(name == ""){
            name = "Mr. Nobody";
        }
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






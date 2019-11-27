# liri-node-app
Techonologies used:
1. node js
2. moment

Query websites:
1. Bands in town (to get information about bands) : https://www.bandsintown.com/en
2. Spotify (to get information about music album): https://www.spotify.com/us/
3. IMDB (to get information about movies): https://www.imdb.com/

This project is all about getting information about bands, music albums and movies.
1. When a user enters node liri.js concert-this <artist/band name here>, it will provide 
    1. Name of the venue
    2. Venue location
    3. Date of the Event 
2. When a user enters node liri.js spotify-this-song <song name here>, it will provide 
    1. Artist(s)
    2. The song's name
    3. A preview link of the song from Spotify
    4. The album that the song is from
and if user enters node liri.js spotify-this-song, it will provide all the above inforation about "The Sign" song.
3. When a user enters node liri.js movie-this <movie name here>, it will provide 
    1. Title of the movie.
    2. Year the movie came out.
    3. IMDB Rating of the movie.
    4. Rotten Tomatoes Rating of the movie.
    5. Country where the movie was produced.
    6. Language of the movie.
    7. Plot of the movie.
    8. Actors in the movie.
and if user enters node liri.js movie-this, it will provide all the above inforation about "Mr. Nobody" movie.
4. When a user enters node liri.js do-what-it-says, it will generate a random number and read the rando line from random.txt file and displays the content appropriately.
5.  When a user enters node liri.js, it will show, "Sorry this request cannot be made."

function to get name from the user input


    function getName(){
      name = "";
      for( var i=3; i < nodeA.length; i++){
        if(i>3 && i< nodeA.length){
            name = name + " " + nodeA[i];
        }else{
            name += nodeA[i];
        }
      }
    }


function to print the data in log file and on the console

    function log(message){
     console.log(message);
     fs.appendFile("log.txt", message + '\n', function(err){
        if(err){
            console.log(err);
        }
     });
    }


 function will get concert details from bandsintown site

    function getConcertInfo(name){
      if(name == ""){
        name = "Billie Eilish";
      }
      var queryUrl = "http://rest.bandsintown.com/artists/" + name + "/events?app_id=codingbootcamp";   
      axios.get(queryUrl).then(
      function(response) {
        for( var i = 0; i < response.data.length; i++){
            log("Name of the venue: " + response.data[i].venue.name);
            log("Venue location: " + response.data[i].venue.city + " "
                + response.data[i].venue.region + " " + response.data[i].venue.country);
            log("Date of the Event: " +  moment(response.data[i].datetime).format('MM/DD/YYYY')); 
        }
      });
    }


[!gif] (https://user-images.githubusercontent.com/7834767/69755223-9ed10680-110c-11ea-8a45-435aebdf01d1.gif)
//read and set any environment variables with the dotenv package
require("dotenv").config();

//import the `keys.js` file and store it in a variable
var spotify = new Spotify(keys.spotify);

//Requires request npm package
var request = require("request");

//Assigns user input to variables
var nodeArgs = process.argv;
var command = nodeArgs[2];

//Switch-case statement runs a function according to user input
switch (command) {
case "concert-this":
  concertThis();
  break;

case "spotify-this":
  spotifyThis();
  break;

case "movie-this":
  movieThis();
  break;

case "do-what-it-says":
  doWhatItSays();
  break;
}

//Functions

function concertThis() {
  
}

function spotifyThis() {

}

function movieThis() {
  //creates empty variable for movie name
  var movieName = "";
  //loops through node arguments to assemble the title into a string
  for (var i = 3; i < nodeArgs.length; i++) {
    if (i > 3 && i < nodeArgs.length) {
      movieName = movieName + "+" + nodeArgs[i];
    }
    else {
      movieName += nodeArgs[i];
    }
  }
  //Creates query URL
  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
  //requests and prints movie info
  request(queryUrl, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
      console.log("The movie's director is: " + JSON.parse(body).Director);
      console.log("The movie's actors are: " + JSON.parse(body).Actors);
    }
  });
}

function doWhatItSays() {

}




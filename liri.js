//LIRI Homework

//reads and sets environment variables with the dotenv package
require("dotenv").config();

//imports the `keys.js` file and stores it in a variable
var keys = require("./keys.js");

//requires node-spotify-api package
var Spotify = require("node-spotify-api");
//initializes spotify object with local keys
var spotify = new Spotify(keys.spotify);

//Requires request npm package
var request = require("request");

//Assigns user input to variables
var nodeArgs = process.argv;
var command = nodeArgs[2];

//Switch-case statement calls a function according to user input
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
  //creates empty variable for band name
  var bandName = "";
  //loops through node arguments to assemble the band name into a string
  for (var i = 3; i < nodeArgs.length; i++) {
    if (i > 3 && i < nodeArgs.length) {
      bandName = bandName + "+" + nodeArgs[i];
    }
    else {
      bandName += nodeArgs[i];
    }
  }
  //Creates query URL
  if (nodeArgs[3] === undefined) {
    console.log("\nPlease include a band or artist name!");
    return;
  }
  else {
    var queryUrl = "https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=codingbootcamp";
  }
  //requests and prints concert info
  request(queryUrl, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      if (JSON.parse(body) == "") {
        console.log("\nNo concerts scheduled. Try another artist.");
      }
      else {
        for (i=0; i < JSON.parse(body).length; i++) {
          console.log("\nThe venue name is: " + JSON.parse(body)[i].venue.name);
          console.log("The venue location is: " + JSON.parse(body)[i].venue.city + ", " + JSON.parse(body)[i].venue.region);
          console.log("The concert date is: " + JSON.parse(body)[i].datetime);
          // console.log(JSON.parse(body));
        }
      }
    }
  });
}

function spotifyThis() {
  //creates empty variable for song name
  var songName = "";
  //loops through node arguments to assemble the title into a string
  for (var i = 3; i < nodeArgs.length; i++) {
    if (i > 3 && i < nodeArgs.length) {
      songName = songName + " " + nodeArgs[i];
    }
    else {
      songName += nodeArgs[i];
    }
  }
  //Requires user input of song title
  if (nodeArgs[3] === undefined) {
    console.log("\nPlease include a song title!");
    return;
  }
  //requests and prints song info
  spotify.search({ type: 'track', query: songName }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
  console.log(data.tracks); 
  });
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
  if (nodeArgs[3] === undefined) {
    var queryUrl = "http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=trilogy";
  }
  else {
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
  }
  //requests and prints movie info
  request(queryUrl, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log("\nThe movie's title is: " + JSON.parse(body).Title);
      console.log("The movie was released in: " + JSON.parse(body).Year);
      console.log("The movie's IMDB rating is: " + JSON.parse(body).imdbRating);
      if (JSON.parse(body).Ratings == "" || JSON.parse(body).Ratings[1] === undefined) {
        console.log("This movie doesn't have a Rotten Tomatoes rating");
      }
      else {
        console.log("The movie's Rotten Tomatoes rating is: " + JSON.parse(body).Ratings[1].Value);
      }
      console.log("The movie was produced in: " + JSON.parse(body).Country);
      console.log("The movie's language is: " + JSON.parse(body).Language);
      console.log("The movie's plot: " + JSON.parse(body).Plot);
      console.log("The movie's actors are: " + JSON.parse(body).Actors);
      // console.log(JSON.parse(body));
    }
  });
}

function doWhatItSays() {

}




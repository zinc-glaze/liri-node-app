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

//Requires moment npm package
var moment= require("moment");

//Requires file system package
var fs = require("fs");

//Assigns user input to variables
var nodeArgs = process.argv;
var command = nodeArgs[2];

//Switch-case statement calls a function according to user input
switch (command) {
case "concert-this":
  concertThis();
  break;

case "spotify-this-song":
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
          console.log("\nVenue name: " + JSON.parse(body)[i].venue.name);
          console.log("Venue location: " + JSON.parse(body)[i].venue.city + ", " + JSON.parse(body)[i].venue.region);
          console.log("Concert date: " + moment(JSON.parse(body)[i].datetime).calendar());
          // console.log(JSON.parse(body));
        }
      }
    }
  });
}

function spotifyThis() {
  //If no arguments input by user
  if (nodeArgs[3] === undefined) {
    var songName = "the sign ace of base";
  }
  else {
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
  }
  //requests and prints song info
  spotify.search({ type: 'track', query: songName, limit: 1 }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
  console.log("\nArtist: " + data.tracks.items[0].artists[0].name); 
  console.log("Song Title: " + data.tracks.items[0].name); 
  console.log("Spotify Preview Link: " + data.tracks.items[0].preview_url); 
  console.log("Album Title: " + data.tracks.items[0].album.name); 
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
      console.log("\nMovie title: " + JSON.parse(body).Title);
      console.log("Year released: " + JSON.parse(body).Year);
      console.log("IMDB rating: " + JSON.parse(body).imdbRating);
      if (JSON.parse(body).Ratings == "" || JSON.parse(body).Ratings[1] === undefined) {
        console.log("This movie doesn't have a Rotten Tomatoes rating");
      }
      else {
        console.log("Rotten Tomatoes rating: " + JSON.parse(body).Ratings[1].Value);
      }
      console.log("Country: " + JSON.parse(body).Country);
      console.log("Language: " + JSON.parse(body).Language);
      console.log("Plot synopsis: " + JSON.parse(body).Plot);
      console.log("Actors: " + JSON.parse(body).Actors);
      // console.log(JSON.parse(body));
    }
  });
}

function doWhatItSays() {
  //grabs data from text file
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }
    //splits data into array at commas
    var dataArr = data.split(",");
    //pushes function name and search term to nodeArgs at correct indices
    nodeArgs.splice(2);
    nodeArgs.push(dataArr[0], dataArr[1]);
    //calls function
    switch (dataArr[0]) {
      case "concert-this":
        concertThis();
        break;
      
      case "spotify-this-song":
        spotifyThis();
        break;
      
      case "movie-this":
        movieThis();
        break;
      }
  });
}




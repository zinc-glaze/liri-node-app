# LIRI (Language Interpretation and Recognition Interface)
## UNC Coding Bootcamp Node.js Homework  11-9-2018

Screen capture video of LIRI app functions:
https://drive.google.com/open?id=1X4N2nGo-hMW-SJpVOK-XIQPkXlcZwy02

LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data. The app recognizes four commands:

1. `node liri.js concert-this <artist/band name here>`
   * This will search the Bands in Town Artist Events API (`"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"`) for an artist and render the following information about each event to the terminal:
     * Name of the venue
     * Venue location
     * Date of the Event (use moment to format this as "MM/DD/YYYY")

2. `node liri.js spotify-this-song '<song name here>'`
   * This will show the following information about the song in your terminal/bash window
     * Artist(s)
     * The song's name
     * A preview link of the song from Spotify
     * The album that the song is from
   * If no song is provided then your program will default to "The Sign" by Ace of Base.

3. `node liri.js movie-this '<movie name here>'`
   * This will output the following information to your terminal/bash window:
       * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.
   * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

4. `node liri.js do-what-it-says`
   * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

This app uses the following tools:
  * Node.js for Javascript runtime environment
  * Javascript for app logic
  * moment npm package for time/date conversions and formatting
  * dotenv npm package for protecting API keys
  * request npm package for API requests
  * node-spotify-api package for Spotify API requests

Future development of the app will add:
  * Writing the user input and data received to a text file for reference
  * Additional fixes for errors created by inconsistencies in the data objects returned from APIs

Installation: You must have Node.js installed to run this app from the command line using the commands listing above. Install npm dependencies before running. 



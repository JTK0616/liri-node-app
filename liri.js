// Include Twitter, Spotify, and Request NPM Packages

var twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');

// Bring in twitter keys from key.js

var keys = require('./keys.js');

// Take in the command line arguments and store in the variable nodeArgs

var nodeArgs = process.argv[2];


// *************************  Code for TWITTER  *********************************

// Make a new client object containing twitter keys

var client = new twitter({
  consumer_key: keys.twitterKeys.consumer_key,
  consumer_secret: keys.twitterKeys.consumer_secret,
  access_token_key: keys.twitterKeys.access_token_key,
  access_token_secret: keys.twitterKeys.access_token_secret
});


// Test to be certain keys are being imported correctly

// console.log(client.consumer_secret);



// Display last 20 tweets if command line input = "my-tweets"

if (nodeArgs=="my-tweets") {
	var parameters = {screen_name: 'jeffreytknowles', count: 20};
	client.get('statuses/user_timeline', parameters, function (error, tweets, response) {
		if (!error) {for(i = 0; i < 3; i++) {
			console.log("Tweet: " + JSON.stringify(tweets[i].text, null, 10));
			console.log("Created at: " + JSON.stringify(tweets[i].created_at, null, 10));
			console.log("*****************************************************");
		}
			// console.log(JSON.stringify(tweets, null, 10));
		};
	});

};


// Create an empty string for holding what is entered after the Liri command.  This will be used to lookup song titles and movie titles


var text = "";

// Capture all the words in the text (ignoring the first two Node arguments)
for (var i = 3; i < process.argv.length; i++) {

  // Build a string with the text.
  text = text + " " + process.argv[i];

}

// *****************  Code for SPOTIFY  *************************

// Return Artist, Song Name, a preview link of the song from Spotify, and the albumn the song is from
//  Search for text variable on spotify.  Console log data

if (nodeArgs=="spotify-this-song") {

spotify.search({ type: 'track', query: text }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
    console.log("Artist Name: " + JSON.stringify(data.tracks.items[0].album.artists[0].name,null,2));
    console.log("Song Name: " + JSON.stringify(data.tracks.items[0].name,null,2));
    console.log("Preview Link: " + JSON.stringify(data.tracks.items[0].preview_url,null,2));
    console.log("Albumn Name: " + JSON.stringify(data.tracks.items[0].album.name,null,2));
    // console.log(JSON.stringify(data.tracks.items[0],null,10));  <-------Code to console log all data
});

};

// *******************   Code for OMDb API  **********************

// Search for text variable on OMDb API.  Return:  Title of the movie, year the movie came out,
// IMDB Rating, Country where the movie was produced, language of the movie, Plot of the movie,
// Actors in the movie, Rotten Tomatoes rating, Rotten tomatoes URL


if (nodeArgs=="movie-this") {	
  request('http://www.omdbapi.com/?t=' + text, function (error, response, body) {
  // console.log('error:', error); // Print the error if one occurred 
  // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
  // console.log('body:', body); // Print the HTML. 

  console.log("Title: " + JSON.parse(body).Title);
  console.log("Year Released: " + JSON.parse(body).Year);
  console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
  console.log("Country Produced: " + JSON.parse(body).Country);
  console.log("Movie Language: " + JSON.parse(body).Language);
  console.log("Plot: " + JSON.parse(body).Plot);
  console.log("Actors: " + JSON.parse(body).Actors);
  console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
  console.log("Rotten Tomatoes URL: " + JSON.parse(body).Title);

  // console.log(JSON.stringify(body, null, 10));  <-------Code to console log all data
});

};


// *******************   Code for DO WHAT IT SAYS  **********************

// if (nodeArgs=="do-what-it-says") {
// 	console.log("Just Do It!");
// } else {
// 	console.log("Invalid Command.  Valid commands are: my-tweets ; spotify-this-song ; movie-this ; do-what-it-says")
// }




// mongoimport.js
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/wcp-dev');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
var Schema = mongoose.Schema;

var matches = require('./matches');

var Match = mongoose.model(
	'Match', 
	mongoose.Schema({
		"_id": String,
		"stage": Number,
		"matchDate": {type: Date },
		"venue": {type: String, ref: 'Venue',
		"completed": Boolean,
		"team": {
			"home": {
				"team_id": {type: String, ref: 'Team'},
				"score": Number
			},
			"away": {
				"team_id": {type: String, ref: 'Team'},
				"score": Number
			}
		}
	})
);

Match.find({},function(err,dbmatches){

	for(var i=0; i<dbmatches.length; i++) {
		dbmatches[i].remove();
	}

	for(var i=0; i<matches.length; i++) {
		var match = new Match({
			"_id": matches[i]._id,
			"stage": matches[i].stage,
			"matchDate": matches[i].matchDate,
			"venue": matches[i].venue,
			"completed": matches[i].completed,
			"team": matches[i].team
		})

		match.save(function(err,dbmatch){
			if (err)
			console.log("Error on match save!");
		})
	}
	
	console.log("Match import finished! Press Ctrl+C to exit.");
})

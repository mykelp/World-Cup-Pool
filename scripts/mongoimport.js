// mongoimport.js
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/wcp-dev');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var teams = require('./teams');

var Team = mongoose.model(
	'Team', 
	mongoose.Schema({
		"id": Number,
		"abbr": String,
		"country": String,
		"group": Number,
		"played": Number,
		"won": Number,
		"draw": Number,
		"loss": Number,
		"goalsfor": Number,
		"goalsagainst": Number,
		"points": Number
	})
);

Team.find({},function(err,dbteams){

	for(var i=0; i<dbteams.length; i++) {
		dbteams[i].remove();
	}

	for(var i=0; i<teams.length; i++) {
		var team = new Team({
			"id": teams[i].id,
			"abbr": teams[i].abbr,
			"country": teams[i].country,
			"group": teams[i].group,
			"played": teams[i].played,
			"won": teams[i].won,
			"draw": teams[i].draw,
			"loss": teams[i].loss,
			"goalsfor": teams[i].goalsfor,
			"goalsagainst": teams[i].goalsagainst,
			"points": teams[i].points
		})

		team.save(function(err,dbteam){
			if (err)
			console.log("Error on team save!");
		})
	}
	
	console.log("Team import finished! Press Ctrl+C to exit.");
})

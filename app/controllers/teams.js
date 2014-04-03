var mongoose = require('mongoose')
	, async = require('async')
	, Team = mongoose.model('Team')
	, _ = require('underscore')._;

exports.show = function(req, res) {
	res.jsonp(req.team);
};

exports.team = function(req, res, next, id) {
	var Team = mongoose.model('Team');

	Team.load(id, function(err, team) {
		if(err) return next(err);
		if(!team) return next(new Error('Failed to load team ' + id));
		req.team = team;
		next();
	});
};

exports.all = function(req, res){
  Team.find(function(err, teams) {
    if (err) {
      res.render('error', {status: 500});
    } else {			
      res.jsonp(teams);
    }
  });
}
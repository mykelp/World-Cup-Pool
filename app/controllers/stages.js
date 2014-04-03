var mongoose = require('mongoose')
	, async = require('async')
	, Stage = mongoose.model('Stage')
	, _ = require('underscore')._;

exports.show = function(req, res) {
	res.jsonp(req.stage);
};

exports.stage = function(req, res, next, id) {
	var Stage = mongoose.model('Stage');
	var Team = mongoose.model('Team')

	Stage.load(id, function(err, stage) {
		if(err) return next(err);
		if(!stage) return next(new Error('Failed to load stage ' + id));

		matches = stage.matches;

		Team.populate(matches, {path: 'team.home.team_id team.away.team_id'}, function (err, matches) {
			stage.matches = matches;
			req.stage = stage;
			next();
		});
	});
};

exports.all = function(req, res){
  Stage.loadAll(function(err, stages) {
    if (err) {
      res.render('error', {status: 500});
    } else {			
      res.jsonp(stages);
    }
  });
}

exports.groups = function(req, res) {
	Stage.groups(function(err, groups) {
		if (err) {
	      res.render('error', {status: 500});
	    } else {			
	      res.jsonp(groups);
	    }
	});
}
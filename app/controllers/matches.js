var mongoose = require('mongoose')
	, async = require('async')
	, Match = mongoose.model('Match')
	, _ = require('underscore')._;

exports.show = function(req, res) {
	res.jsonp(req.match);
};

exports.match = function(req, res, next, id) {
	var Match = mongoose.model('Match');

	Match.load(id, function(err, match) {
		if(err) return next(err);
		if(!match) return next(new Error('Failed to load match ' + id));
		req.match = match;
		next();
	});
};

exports.all = function(req, res){
  Match.loadAll(function(err, matches) {
    if (err) {
      res.render('error', {status: 500});
    } else {			
      res.jsonp(matches);
    }
  });
}
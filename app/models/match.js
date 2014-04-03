var mongoose = require('mongoose'),
	env = process.env.NODE_ENV || 'development',
	config = require('../../config/config')[env],
	Schema = mongoose.Schema;

var MatchSchema = new Schema({
	_id: {type: String},
	matchNumber: {type: Number},
	stage: {type: Number},
	matchDate: {type: Date},
	venue: {type: String, ref: 'Venue'},
	completed: {type: Boolean, default: false},
	team: {
		home: {
			team_id: {type: String, ref: 'Team'},
			score: {type: Number}
		},
		away: {
			team_id: {type: String, ref: 'Team'},
			score: {type: Number}
		}
	}
});

MatchSchema.statics = {
	load: function (id, cb) {
		this.findOne({ _id : id }).populate('venue').populate('team.home.team_id').populate('team.away.team_id').exec(cb);
	},
	loadAll: function (cb) {
		this.find().populate('venue').populate('team.home.team_id').populate('team.away.team_id').exec(cb);
	}
};

mongoose.model('Match', MatchSchema);
var mongoose = require('mongoose'),
	env = process.env.NODE_ENV || 'development',
	config = require('../../config/config')[env],
	Schema = mongoose.Schema;

var StageSchema = new Schema({
	_id: {type: String},
	matches: [{type : String, ref: 'Match'}],
	teams: {
		team_id1: {
			team: {type: String, ref: 'Team'},
			played: {type : Number},
			won: {type : Number},
			draw: {type : Number},
			loss: {type : Number},
			goalsfor: {type : Number},
			goalsagainst: {type : Number},
			points: {type: Number}
		},
		team_id2: {
			team: {type: String, ref: 'Team'},
			played: {type : Number},
			won: {type : Number},
			draw: {type : Number},
			loss: {type : Number},
			goalsfor: {type : Number},
			goalsagainst: {type : Number},
			points: {type: Number}
		},
		team_id3: {
			team: {type: String, ref: 'Team'},
			played: {type : Number},
			won: {type : Number},
			draw: {type : Number},
			loss: {type : Number},
			goalsfor: {type : Number},
			goalsagainst: {type : Number},
			points: {type: Number}
		},
		team_id4: {
			team: {type: String, ref: 'Team'},
			played: {type : Number},
			won: {type : Number},
			draw: {type : Number},
			loss: {type : Number},
			goalsfor: {type : Number},
			goalsagainst: {type : Number},
			points: {type: Number}
		}
	}
});

StageSchema.statics = {
	load: function (id, cb) {
		this.findOne({ _id : id }).populate('matches').populate('teams.team_id1.team').populate('teams.team_id2.team').populate('teams.team_id3.team').populate('teams.team_id4.team').exec(cb);
	},
	loadAll: function (cb) {
		this.find().populate('matches').exec(cb);
	},
	groups: function (cb) {
		this.find({_id: { $in:['group_a', 'group_b', 'group_c', 'group_d', 'group_e', 'group_f', 'group_g', 'group_h'] } }).populate('matches').populate('teams.team_id1.team').populate('teams.team_id2.team').populate('teams.team_id3.team').populate('teams.team_id4.team').exec(cb);
	}
};

mongoose.model('Stage', StageSchema);
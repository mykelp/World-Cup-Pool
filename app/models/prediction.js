var mongoose = require('mongoose'),
	env = process.env.NODE_ENV || 'development',
	config = require('../../config/config')[env],
	Schema = mongoose.Schema;

var PredictionSchema = new Schema({
	_id: {type: String},
	predictor: {type: Schema.ObjectId, ref: 'User'},
	stagePredictions: [ {
		stage: {type: String},
		matchPredictions: [ {
			matchNumber: {type: Number},
			score: {
				home: {type: Number},
				away: {type: Number}
			}
		}],
		teams: {
			team_id1: {
				team: {type: String, ref: 'Team'},
				won: {type : Number},
				draw: {type : Number},
				loss: {type : Number},
				goalsfor: {type : Number},
				goalsagainst: {type : Number},
				points: {type: Number}
			},
			team_id2: {
				team: {type: String, ref: 'Team'},
				won: {type : Number},
				draw: {type : Number},
				loss: {type : Number},
				goalsfor: {type : Number},
				goalsagainst: {type : Number},
				points: {type: Number}
			},
			team_id3: {
				team: {type: String, ref: 'Team'},
				won: {type : Number},
				draw: {type : Number},
				loss: {type : Number},
				goalsfor: {type : Number},
				goalsagainst: {type : Number},
				points: {type: Number}
			},
			team_id4: {
				team: {type: String, ref: 'Team'},
				won: {type : Number},
				draw: {type : Number},
				loss: {type : Number},
				goalsfor: {type : Number},
				goalsagainst: {type : Number},
				points: {type: Number}
			}
		}
	}]
});

PredictionSchema.statics = {
	load: function (id, cb) {
		this.findOne({ _id : id }).populate('predictor').populate('stagePredictions.teams.team_id1.team').populate('stagePredictions.teams.team_id2.team').populate('stagePredictions.teams.team_id3.team').populate('stagePredictions.teams.team_id4.team').exec(cb);
	}
};

mongoose.model('Prediction', PredictionSchema);
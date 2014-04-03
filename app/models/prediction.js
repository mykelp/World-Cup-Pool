var mongoose = require('mongoose'),
	env = process.env.NODE_ENV || 'development',
	config = require('../../config/config')[env],
	Schema = mongoose.Schema;

var PredictionSchema = new Schema({
	_id: {type: String},
	predictor: {type: Schema.ObjectId, ref: 'User'},
	predictions: [ {
		stage: {type: Number},
		matchNumber: {type: Number},
		score: {
			home: {type: Number},
			away: {type: Number}
		}
	}]
});

PredictionSchema.statics = {
	load: function (id, cb) {
		this.findOne({ _id : id }).populate('predictor').exec(cb);
	}
};

mongoose.model('Prediction', PredictionSchema);
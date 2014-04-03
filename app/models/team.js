var mongoose = require('mongoose'),
	env = process.env.NODE_ENV || 'development',
	config = require('../../config/config')[env],
	Schema = mongoose.Schema;

var TeamSchema = new Schema({
		_id: {type : String},
		abbr: {type : String},
		country: {type : String}
});

TeamSchema.statics = {
	load: function (id, cb) {
		this.findOne({ _id : id }).exec(cb);
	}
};

mongoose.model('Team', TeamSchema);
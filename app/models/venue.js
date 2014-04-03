var mongoose = require('mongoose'),
	env = process.env.NODE_ENV || 'development',
	config = require('../../config/config')[env],
	Schema = mongoose.Schema;

var VenueSchema = new Schema({
	_id: {type: String},
	city: {type: String},
	stadium: {type: String}
});

VenueSchema.statics = {
	load: function (id, cb) {
		this.findOne({ _id : id }).exec(cb);
	},
	loadAll: function (cb) {
		this.find().exec(cb);
	}
};

mongoose.model('Venue', VenueSchema);
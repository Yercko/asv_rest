var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var clubSchema = new Schema({
	name: { type: String, require: true, unique: true },
    country: String,
    rival: String,
    champions: [Date],
	photo: String
});

module.exports = mongoose.model("Club", clubSchema);

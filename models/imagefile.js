const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const imageSchema = new Schema ({
	data: Buffer,
	contentType: String,
	fileName: String
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;


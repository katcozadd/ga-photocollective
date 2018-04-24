var mongoose = require("mongoose");
if (process.env.NODE_ENV == "production") {
	console.log("connecting to... " + process.env.NODE_ENV)
	console.log("also connecting to mlab  " + process.env.MLAB_URL)
  mongoose.connect(process.env.MLAB_URL)
} else {
	console.log("this is the local ")
  mongoose.connect("mongodb://localhost/colorado-collective");
}
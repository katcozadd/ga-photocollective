// require express framework and additional modules
const express    = require('express');
const app        = express();
const path       = require('path');
const multer     = require('multer');
const cloudinary = require('cloudinary');
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');
const morgan     = require('morgan');
const User       = require('./models/user');
const Image      = require('./models/imagefile')
const session    = require('express-session');

// middleware
// serve static files in public
app.use('/uploads', express.static('uploads'));
app.use(express.static('public'));
app.use('/static', express.static(path.join(__dirname, 'public')));

//set the view engine 
app.set('views', './views');
app.set('view engine', 'ejs');


// body parser config to accept my datatypes
app.use(bodyParser.urlencoded({ extended: true }));

//sessions
app.use(session({
	saveUnitialized : true,
	resave:true,
	secret:'SuperSecretCookie',
	cookie:{maxAge:30*60*1000}
}));



//set storage engine
const storage = multer.diskStorage({
	destination: './public/uploads/',
	filename: function(req, file, callback){
		callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
	}
});

//initialize upload
const upload = multer({
	storage: storage,
	limits: {fileSize: 10000000},
	fileFilter: function(req, file, callback) {
		checkFileType(file, callback);
	}	
}).single('myImage');

//Check file type
function checkFileType(file, callback) {
	const filetypes = /jpeg|jpg|png|gif/; //file can only be of these file types otherwise a file cannot be uploaded
	const extname = filetypes.test(path.extname(file.originalname).toLowerCase()); //creating variable to test that the name of the file has specific filetype in it
	const mimetype = filetypes.test(file.mimetype); //creating variable to compare the file mimetype to the specified mimetypes
	if (mimetype && extname) {
		return callback(null, true); //if the mimetype and extname both are the correct filetype upload photo
	} else {
		callback('Error! Only images can be uploaded.'); //if not display this error message
	}
}

/**********
 * ROUTES *
 **********/

//homepage
app.get('/', function (req, res) {
	res.render("index");
});

//signup page
app.get('/signup', function (req, res) {
	res.render('signup');
});

//login page
app.get('/login', function (req, res) {
	res.render('login');
});

//about page route
app.get('/about',  function (req, res) {
	res.render('about');
})

//creating user 
app.post('/signup', function (req, res) {
	User.createSecure(req.body.email, req.body.password, function(err, newUser) {
		console.log(req.body.email);
		console.log(req.body.password);
		if (err) {
			console.log("index error: " + err);
      		res.sendStatus(500);
		} else {
			req.session.userId = newUser.id;
			res.json(newUser);
		}
	});
});

//authenticate user log in
app.post('/login', function (req, res) {
	User.authenticate(req.body.email, req.body.password, function (err, returningUser) {
		if (err) {
			console.log("index error: " + err);
      		res.sendStatus(500);
		} else {
			req.session.userId = returningUser.id;
			res.json(returningUser);
		}
	});
});

//projects page route
app.get('/project', function (req, res) {
	User.findOne({_id : req.session.userId}, function (err, user) {
	res.render('project', {user: user});
	});
});


//welcome page after signing up
app.get('/welcome', function (req, res) {
	User.findOne({_id : req.session.userId}, function (err, user) {
		res.render('welcome', {user: user});
	});
});


//create - upload route
app.post('/upload', function (req, res) {
	upload(req, res, (err) => {
		if (err) {
			res.render('project', {
				msg: err
			});
		} else {
			if (req.file === undefined) { //if there is no file uploaded throw error
				res.render('project', {
					msg: "Error! No image was selected to upload."
				});
			} else {
				console.log(req.file);
				let imageObject = {
					contentType: req.file.mimetype,
					fileName: req.file.filename
				}
				Image.create(imageObject, function(err, newImage) {
					if (err) {
						console.log("new image error: " + err);
					} else {
						console.log(newImage);
						res.render('project', {
						msg: 'File uploaded!',
						file: `uploads/${newImage.fileName}` //using interpolation to append file through img tag in ejs file
					});
					}
				});

			}
		}
	});
});

// app.get('/upload', function (req, res, next) {
// 	Image.find(err, image) {
// 		if (err) {
// 			console.log('index error: ' + err);
// 			res.sendStatus(500);
// 		}
// 		res.json(image);
// 	}
// })

/**********
 * SERVER *
 **********/
// listen on port 3000
  app.set('port', process.env.PORT || 3001)

  app.listen(app.get('port'), () => {
    console.log(`✅ PORT: ${app.get('port')} 🌟`)
  })
// require express framework and additional modules
const express    = require('express');
const app        = express();
const path       = require('path');

const bodyParser = require('body-parser');
const mongoose   = require('mongoose');
const morgan     = require('morgan');
const User       = require('./models/user');
const session    = require('express-session');

// middleware
// serve static files in public
app.use(express.static('public'));
app.use('/static', express.static(path.join(__dirname, 'public')));

//set the view engine 
app.set('views', './views');
app.set('view engine', 'ejs');


// body parser config to accept my datatypes
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
	saveUnitialized : true,
	resave:true,
	secret:'SuperSecretCookie',
	cookie:{maxAge:30*60*1000}
}));

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

//creating user 
app.post('/signup', function (req, res) {
	User.createSecure(req.body.email, req.body.password, function(err, newUser) {
		console.log(req.body.email);
		console.log(req.body.password);
		if (err) {
			console.log("index error: " + err);
      		res.sendStatus(500);
		} else {
			res.json(newUser);
		}
	});
});

//login page
app.get('/login', function (req, res) {
	res.render('login');
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
	})
})

//about page route
app.get('/about',  function (req, res) {
	res.render('about');
})




/**********
 * SERVER *
 **********/
// listen on port 3000
  app.set('port', process.env.PORT || 3001)

  app.listen(app.get('port'), () => {
    console.log(`✅ PORT: ${app.get('port')} 🌟`)
  })
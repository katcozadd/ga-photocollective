// require express framework and additional modules
const express    = require('express');
const app        = express();
const path       = require('path');

const bodyParser = require('body-parser');
const mongoose   = require('mongoose');
const morgan     = require('morgan');
// const db         = require('./models');
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
mongoose.connect('mongodb://localhost/photo-users');

/**********
 * ROUTES *
 **********/

app.get('/', function (req, res) {
	res.render("index")
})








/**********
 * SERVER *
 **********/
// listen on port 3000
app.listen(3000, function () {
  console.log('server started on locahost:3000');
});
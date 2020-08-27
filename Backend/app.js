var express = require('express');
var cors = require('cors')
var routes = require('./routes');
var passport = require('passport');
var flash = require('express-flash');
var fileUpload = require('express-fileupload');
var cookieSession = require('cookie-session');
require('dotenv').config();

var app = express();

//body-parser
app.use(express.urlencoded({ extended: true }));

// file fileUpload middleware
app.use(fileUpload());

// Messages 
app.use(flash());

// Session 
app.use(cookieSession({
	maxAge : 45*60*1000,
	keys : [process.env.SESSION_SECRET],
}));


// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Cross Origin Resource Sharing
app.use(cors({
	credentials: true,
	origin: 'http://localhost:3000'
}));

//routes
app.use('/',routes);


var port = 8000;
app.listen(port);
console.log("Server Is Online at port "+port);
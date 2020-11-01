var express = require('express');
var cors = require('cors')
var routes = require('./routes');
var passport = require('passport');
var flash = require('express-flash');
var fileUpload = require('express-fileupload');
// var cookieSession = require('cookie-session');
// var session = require('express-session')
require('dotenv').config();

var app = express();

//body-parser
app.use(express.urlencoded({ extended: true }));

// static files
app.use(express.static('./public'))

// file fileUpload middleware
app.use(fileUpload());

// Messages 
app.use(flash());

// Session 
// app.use(session({
// 	secret : process.env.SESSION_SECRET,
// 	resave: false,
// 	sameSite : null,
//     saveUninitialized: true,
//     cookie : {
//     	maxAge : 45*60*1000,
//     }
// }));


// passport middleware
app.use(passport.initialize());
// app.use(passport.session());

// Cross Origin Resource Sharing
app.use(cors({
	credentials: true,
	origin: 'http://localhost:3000'
}));

//routes
app.use('/',routes);


const port = process.env.port || 8000;
app.listen(port);
console.log("Server Is Online at port "+port);
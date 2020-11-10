var express = require('express');
var cors = require('cors')
var routes = require('./routes');
var passport = require('passport');
var flash = require('express-flash');
var fileUpload = require('express-fileupload');
var path = require('path');
// var cookieSession = require('cookie-session');
// var session = require('express-session')
// require('dotenv').config();

var app = express();

//body-parser
app.use(express.urlencoded({ extended: true }));

// static files
app.use(express.static('./proposal'))

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

//
if(process.env.NODE_ENV == "production"){
	app.use(express.static(path.join('Frontend','build')));
	
	app.get('*',(req,res) => {
		res.sendFile(path.resolve(process.env.PWD+'Frontend','build','index.html'));
	});
}
const port = process.env.PORT || 8000;
app.listen(port);
console.log("Server Is Online at port "+port);
console.log(path.resolve(process.env.PWD+'Frontend','build','index.html'))
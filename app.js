//load and cache JavaScript modules
const express = require("express");
//Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
//Create a new morgan logger middleware function using the given format and options
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

//===================================================//
var path = require('path');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// var mongo = require('mongodb');
var mongoose = require('mongoose');
//connect to MongoDB
// mongoose.connect("");
var db = mongoose.connection;
var routes = require('./routes/index');
var users = require('./routes/index');
//===================================================//

const app = express();
const router = express.Router();
const PORT = process.env.PORT || 4000;

// View Engine ==============================//
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');
//==========================================//

// app.set("view engine", "ejs");

// BodyParser Middleware ==============================//
app.use(bodyParser.json());
//==========================================//

app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride("_method"));
app.use(cookieParser("my very well kept secret"))

// Set Static Folder
app.use(express.static('public'))

// Express Session ============================//
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());
//==========================================//

function myLogger(req, res, next) {
  // console.log("Raw Cookies: ",req.headers.cookie)
  console.log("Cookie Parser: ",req.cookies)
  console.log("Signed Cookies: ",req.signedCookies)
  if (req.body) {
    console.log('LOG:',req.method,req.url,req.body)
  }
  // res.append('Set-Cookie', 'lastPage='+req.url);
  next()
}

// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Connect Flash
app.use(flash());

// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

app.use('/', routes);
app.use('/users', users);

app.use(myLogger)
app.use(morgan('common'));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});





  



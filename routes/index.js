var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

var name_array = [];
var all_feedbacks = []
var MongoClient = require('mongodb').MongoClient
var url = "mongodb://wufenglun:wfl86082988@ds121696.mlab.com:21696/wufenglun";

// Get and render the Register page
router.get('/register', function(req, res){
	res.render('register');
});

// Post new user's infomation entered on Register Page, Register new user
router.post('/register', function(req, res, next){
	var name = req.body.name;
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;

	// check if the username already exist
    for (var i = 0; i < name_array.length; i++) {
			if (name_array[i].username == username) {
				req.flash('error_msg', 'Sorry, username already exists.');
				//if already exist, redirect back to the register page
				res.redirect('/users/register');
				//the function end
				return 0;
			}
		}

	// check if the user's information is valid
	req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

	var errors = req.validationErrors();
	//if not valid, redirect back to register page
	if(errors){
		res.render('register',{
			errors:errors
		});
	} else {//user information good to go
		var newUser = new User({
			name: name,
			email:email,
			username: username,
			password: password,
			feedback: []
		});
		//create a new user
		User.createUser(newUser, function(err, user){
			if(err) throw err;
			console.log(user);
		});

		req.flash('success_msg', 'You are registered and can now login');

		res.redirect('/users/login');
	}
});

passport.use(new LocalStrategy(
  function(username, password, done) {
   User.getUserByUsername(username, function(err, user){
   	if(err) throw err;
   	if(!user){
   		return done(null, false, {message: 'Unknown User'});
   	}

   	User.comparePassword(password, user.password, function(err, isMatch){
   		if(err) throw err;
   		if(isMatch){
   			return done(null, user);
   		} else {
   			return done(null, false, {message: 'Invalid password'});
   		}
   	});
   });
  }));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

// Very first page, Login
router.get('/login', function(req, response){
	MongoClient.connect(url, function(err,res){
		if(err) console.log(err)
		//db contains the all information now, name, passowrd,feedback...
		db = res
		//nosql, load all the usernames in the database
		db.collection("users").find({}).project({username:1, _id:0}).toArray(function(err, res) {
			//save all the usernames to name_array
			name_array = res;
			db.close()
			response.render('login');
			})
	    });
	});

// Login with correct password
router.post('/login',
	//check if username and password is a match 
  passport.authenticate('local', {failureRedirect:'/users/login',failureFlash: true}),
  function(req, res) {   
	//log in successfully, initiate session
  	req.session.name = req.body.username
  	req.session.feedback_array = [];
	  //redirect to the main page
    res.redirect('/');
 });

// Show the main page after log in
router.get('/', ensureAuthenticated, function(req, response) {
	var username = req.session.name

	//connect to mongodb with given username
	MongoClient.connect(url, function(err,res){
		if(err) console.log(err)
		db = res
		//load all feedbacks by the current user 
		db.collection("users").find({username:username}).project({feedback:1, _id:0}).toArray(function(err, res) {
			req.session.feedback_array = res[0].feedback;
			db.close()
			})

			MongoClient.connect(url, function(err,res){
			if(err) console.log(err)
			db = res
			//load all the feedbacks by all users
			db.collection("users").find({}).project({feedback:1, _id:0, username:1}).toArray(function(err, res) {
				//save all the feedbacks by all users to all_feedbacks
				all_feedbacks = []
				for (var i = 0; i < res.length; i++) {
					var username = res[i].username
					for (var j = 0; j < res[i].feedback.length; j++){
						all_feedbacks.push([username, res[i].feedback[j]])
					}
				}
				db.close()
				response.render('main', {username: "Welcome! " + req.session.name});
				})
		    });
	    });
	});

// router.get('/api/messages', function(req, response) {
// 	MongoClient.connect(url, function(err,res){
// 		if(err) console.log(err)
// 		db = res
// 		db.collection("public").find({}).project({_id:0}).toArray(function(err, res) {
// 			// for (var i = 0; i < res.length; i++) {
// 			// 	console.log(res[i])
// 			// }
// 			db.close()
// 			var myJsonString = JSON.stringify(res);
// 			response.send(myJsonString);
// 			})	
// 		});
// 	});

//show all the messages
router.get('/api/messages', function(req, response) {
	MongoClient.connect(url, function(err,res){
		if(err) console.log(err)
		db = res
		db.collection("public").find({}).project({_id:0}).toArray(function(err, res) {
			// for (var i = 0; i < res.length; i++) {
			// 	console.log(res[i])
			// }
			db.close()
			response.json(res);
			})	
		});
	});


//post message to database
router.post('/api/messages', function(req, response) {
	//connect to database
	MongoClient.connect(url, function(err,res){
		if(err) console.log(err)
		db = res
		var data = req.body
		var val = Math.floor(1000 + Math.random() * 9000);
		data["id"] = val.toString()
		db.collection("public").insertOne(data, function(err, res){
			if(err) throw err;
			console.log("successful post")
			response.send("successful post! ");
		});
	})
});

//delete message
router.delete('/api/messages/:id', function(req, response) {
	var delete_id = req.params.id
	MongoClient.connect(url, function(err,res){
		if(err) console.log(err)
		db = res
		db.collection("public").deleteOne({id: delete_id}, function(err, res){
			if(err) throw err;
			console.log("successful delete!")
			response.send("successful delete! ");
		});
	})
});

// Log out
router.get('/logout', function(req, res){
	req.logout();
	req.flash('success_msg', 'You are logged out');
	res.redirect('/users/login');
});


// Feedback send page
router.get('/feedback/send', ensureAuthenticated, function(req, res){
	res.render('send', {username: "Welcome! " + req.session.name});
});

// Send user's feedback
router.post('/feedback/send',
  function(req, response) {   
  	var username = req.session.name 
 	var text = req.body.feedback;
 	var date = new Date()
 	
 	var stn = req.body.station

 	text += "$Feedback created at: " + date + "%" + stn

 	//add new feedback to feedback_array
 	req.session.feedback_array.push(text);
 	all_feedbacks.push(username + ": " + text)
  	
  	MongoClient.connect(url, function(err,res){
		if(err) console.log(err)
		db = res
		//update feedback to username
		db.collection('users').update({username: username}, {$set : {feedback : req.session.feedback_array}}, function(err, result) {
	      db.close();
	      response.redirect('/');
	    });
    }); 
 });

// Delete user's feedback
router.delete('/feedback/view/:id', ensureAuthenticated, function(req, response){
	var username = req.session.name 
	var index = req.params.id;
	var delete_item = username + ": " + req.session.feedback_array[index]
	//remove the feedback from all_feedbacks
	all_feedbacks.splice(all_feedbacks.indexOf(delete_item), 1);
	//remove the feedback from session.feedback_array
	req.session.feedback_array.splice(index, 1);

	MongoClient.connect(url, function(err,res){
		if(err) console.log(err)
		db = res
		//update the user's feedback array
		db.collection('users').update({username: username}, {$set : {feedback : req.session.feedback_array}}, function(err, result) {
	      db.close();
	      response.redirect('/feedback/view');
	    });
    });
});

// view user's feedback page
router.get('/feedback/view', ensureAuthenticated, function(req, res){
	var feedbacks = "";
	//iterate through each each feedback
	for (var i = 0; i < req.session.feedback_array.length; i++) {

			var f_index = req.session.feedback_array[i].indexOf("$")
			feedback = req.session.feedback_array[i].slice(0, f_index)

			var time_stn = req.session.feedback_array[i].slice(f_index+1)
			
			var s_index = time_stn.indexOf("%")
			var time = time_stn.slice(0, s_index)
			var stn = "On " + time_stn.slice(s_index+1)
			
			//html + js
			//add feedback html string to the feedbacks for the user
			feedbacks += `<form action="/users/feedback/view/` + i.toString() 
				+ `?_method=DELETE" method="post" id="feedbackform">` + ` <h4 id="feedbacktxt"> ` 
				+ feedback + ` </h4>`
				+ ` <h4 id="feedbacktime"> ` 
				+ time + 
				`</h4> <h4 id="feedbackstn"> ` 
				+ stn + `</h4> 
				<div class="light-form__wrap--center">
	        	<input class="delete__btn" type="submit" value="Delete"/> </div> </form>`
			}
	//respond a pop up with feedbacks 
	res.send(
		`<head>
			<title>Sunshine Boys</title>
			<link rel="stylesheet" href="/css/bootstrap.css" />
		  <link rel="stylesheet" type="text/css" href="/css/mystyle.css">
		  </head>
			<div>
		      <h1 id="head1">Sunshine Boys Website</h1>
		    </div>
		  <body>
		  <div class="light-form" id="feedback">
		    <div class="light-form__title">View Your Feedback</div>
		     <div class="light-form__wrap">
		        <h4 id="feedbacktxt">`+ feedbacks + `</h4>
		    </div>
		    <div class="light-form__wrap--center">
		        <input class="light-form__btn" type="button" onclick="{location.href='/'}" value="Back"/>
		    </div>
		  </div>
		  </body>`)
		});

//view feedback by id
router.get('/feedback/view/:id', ensureAuthenticated, function(request, response) {

	if (request.params.id == request.session.name) {
		response.redirect("/feedback/view")
		return 0;
	}

	MongoClient.connect(url, function(err,res){
		if(err) console.log(err)
		db = res
		//save all feedbacks by the current user in user_feedback
		db.collection("users").find({username:request.params.id}).project({feedback:1, _id:0}).toArray(function(err, res) {
			var user_feedback = res[0].feedback;
			db.close()


	var feedbacks = "";
	
	for (var i = 0; i < user_feedback.length; i++) {
			var f_index = user_feedback[i].indexOf("$")
			feedback = user_feedback[i].slice(0, f_index)

			var time_stn = user_feedback[i].slice(f_index+1)
			
			var s_index = time_stn.indexOf("%")
			var time = time_stn.slice(0, s_index)
			var stn = "On " + time_stn.slice(s_index+1)

			feedbacks += `<form action="/users/feedback/view/` + i.toString() 
				+ `?_method=DELETE" method="post" id="feedbackform">` + ` <h4 id="feedbacktxt"> ` 
				+ feedback + ` </h4>`
				+ ` <h4 id="feedbacktime"> ` 
				+ time + 
				`</h4> <h4 id="feedbackstn"> ` 
				+ stn + `</h4> 
				 </form>`
			}


			response.send(
		`<head>
			<title>Sunshine Boys</title>
			<link rel="stylesheet" href="/css/bootstrap.css" />
		  <link rel="stylesheet" type="text/css" href="/css/mystyle.css">
		  </head>
			<div>
		      <h1 id="head1">Sunshine Boys Website</h1>
		    </div>
		  <body>
		  <div class="light-form" id="feedback">
		    <div class="light-form__title">View `+ request.params.id + "'s " +` Feedback</div>
		     <div class="light-form__wrap">
		        <h4 id="feedbacktxt">`+ feedbacks + `</h4>
		    </div>
		    <div class="light-form__wrap--center">
		        <input class="light-form__btn" type="button" onclick="{location.href='/'}" value="Back"/>
		    </div>
		  </div>
		  </body>`)

			})
	});
	
		

		});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}

module.exports = router;
const express = require('express');
const app = express();
// anytime we have a line that says const something = require('something')
// if the something that is inside the parentheses is not a relative path to a file we created
// then that means it is referencing a third party package. 
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const PORT = 3000;

// =========== connection to DB =============

mongoose
  .connect('mongodb://localhost/expressApp')
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error('Error connecting to mongo', err));

// ==========================================


// middleware always comes between declarations and routes
// ========== MIDDLEWARE =============
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// bodyparser is the package that gives you access to req.body when you send a form on a post route 
// these 2 lines just activate the bodyparser middleware 
// middleware is a fancy work for function or group of functions that run after one thing, and before another
// in this case all of our middlewares run after the user makes a request to the server 
// and before we return an html resource in response to that request


app.use(express.static('public'));
// ^ this is the line that tells our app to look inside the public folder for all static assets like images or css files 
// app.use(express.static('views'));
app.set("views", __dirname + "/views");
// ^ this line tells the app where to look for our views when we do res.render()
app.set("view engine", "hbs");
// ^ this line tells the app we are using hbs for our views
// ===================================


app.use(
  session({
    secret: '123secret',
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 600000
    }, // ADDED code below !!!
    store: MongoStore.create({
      mongoUrl: 'mongodb://localhost/expressApp'
    })
  })
);


app.use(function (req, res, next) {
  // im making a template variable called theUser and imequalling it to 
  // the user object in the session
  res.locals.theUser = req.session.currentlyLoggedIn;
  next();
})


// ============== ROUTES =====================

// this is what determines the prefix to your routes within the file that you are requiring. If you add "/blah" then all the routes in your index file would have to start with /blah before any route defined. ie: you create a route in index.js that has an endpoint of '/home' but you prefixed '/blah' in the app.js to require index.js, your end result of the route would then be www.domainName.com/blah/home
//       |
app.use('/', require('./routes/index'));
app.use('/animals', require('./routes/animals'));
app.use('/locations', require('./routes/locations'));
app.use('/', require('./routes/authroutes'));
// this is how we link our routes files to our app


// ===========================================



// remember to listen at bottom of the app js
app.listen(PORT || 3000, () => console.log(`Listening on port ${PORT}`));



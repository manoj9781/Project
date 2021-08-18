const express = require('express');
const port = 8000;
const app = express();
const db = require('./config/mongoose');
const expressLayouts = require('express-ejs-layouts');
const sassMiddleware = require('node-sass-middleware');

const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

//Mongo store is used to store the session cookie in the db

const MongoStore = require('connect-mongo');

app.use(
  sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css',
  })
);

// Middleware
app.use(express.urlencoded());

// Static function is used to access the local files css images and js
app.use(express.static('./assets'));

//Use express Layouts
app.use(expressLayouts);

//Extract styles and scripts from subpages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//Setup up view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(
  session({
    name: 'Prediction',
    secret: 'Something',
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: MongoStore.create({
      mongoUrl: 'mongodb://localhost/projectDevelopment',
      autoRemove: 'disabled',
    }),
    function(err) {
      console.log(err || 'connect-mongodb setup ok');
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthencticatedUser);

//Use express Router
app.use('/', require('./routes'));

app.listen(port, function (err) {
  if (err) {
    console.log('Error in running the server');
  }
  console.log('Server is up and runnnig on port ', port);
});

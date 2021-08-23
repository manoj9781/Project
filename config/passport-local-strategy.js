const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/users');

passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passReqToCallback:true,
    },
    function (request,email, password, done) {
        User.findOne({ email: email }, function (err, user) {
            if (err) {
                request.flash('error', err);
                // console.log("Error in finding the user");
                return done(err);
            }
            if (!user || user.password != password) {
                request.flash('error', "Invalid Username/Password");
                // console.log("Invalid Username/Password");
                return done(null, false);
            }
            return done(null, user);
        });
    }
));

// Serialize the user to decide which key is to kept in the cookies

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

//deserialize the user from the kry in the cookies

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        if (err) {
            console.log("Error in finding the user");
            return done(err);
        }
        return done(null, user);
    })
});

passport.checkAuthentication = (request, response, next) => {
    if (request.isAuthenticated()) {
        return next();
    }
    return response.render('/users/sign-in');
}

passport.setAuthencticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        //req.user contains the current signed in user fron the session cookie 
        // we are just sending this to locals from the views
        res.locals.user = req.user;
    } 
    next(); 
}

module.exports = passport;
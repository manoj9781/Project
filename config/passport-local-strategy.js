const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/users');

passport.use(new LocalStrategy(
    function (username, password, done) {
        User.findOne({ username: email }, function (err, user) {
            if (err) {
                console.log("Error in finding the user");
                return done(err);
            }
            if (!user) {
                return done(null, false);
            }
            if (!user.verifyPassword(password)) {
                return done(null, false);
                
            }
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

module.exports = passport;
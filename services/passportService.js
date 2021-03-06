const passport = require('passport');
const mongoose = require('mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

const User = mongoose.model('users');


//Generate an identifing information for a logged in user
//We need those functions to use a cookie based Auth
passport.serializeUser((user, done) => {
    done(null, user.id); //ID assigned to this record by Mongo 
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});


passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: `/auth/google/callback`,
    //To tell google strategy to trust our proxy (in our case heroku proxy)
    proxy: true
}, (accessToken, refreshToken, profile, done) => {
    User.findOne({
        googleId: profile.id
    }).then(existingUser => {
        if (existingUser) {
            //User already exists
            console.log('User already exists');
            done(null, existingUser);
        } else {
            new User({
                googleId: profile.id
            }).save().then(user => {
                console.log('User saved ', user);
                done(null, user);
            });
        }
    })
}));
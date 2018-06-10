const passport = require('passport');
const mongoose = require('mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const googleKeys = require('../config/googleKeys');
const PORT = process.env.PORT || 5000;

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
    clientID: googleKeys.googleClientID,
    clientSecret: googleKeys.googleClientSecret,
    callbackURL: `/auth/google/callback`
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
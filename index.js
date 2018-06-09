const express=require('express');
const passport=require('passport');
const GoogleStrategy=require('passport-google-oauth20').Strategy;
const googleKeys=require('./config/googleKeys');
const PORT = process.env.PORT || 5000;

const app=express();

passport.use(new GoogleStrategy({
    clientID:googleKeys.googleClientID,
    clientSecret:googleKeys.googleClientSecret,
    callbackURL:`http://localhost:${PORT}/auth/google/callback`
},(accessToken,refreshToken,profile,done)=>{
    console.log('access token: ',accessToken);
    console.log('refresh token: ',refreshToken);
    console.log('profile: ',profile);
}));

app.get('/auth/google',passport.authenticate('google',{
    scope:['profile','email']
}));

app.get('/auth/google/callback',passport.authenticate('google'));

app.get('/',(req,res)=>{
    res.send('SURVEYYYYYYYS');
})

app.listen(PORT);

const passport = require('passport');

module.exports = (app) => {

    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }));

    app.get('/auth/google/callback', passport.authenticate('google'),(req,res)=>{
        res.redirect('/dashboard');
    });

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    })

    app.get('/api/current_user', (req, res) => {
        //Passport attaches the data of the cookie to req.session
        //Actually it's the user' id that we stored in the cookie
        // res.send(req.session);
        //Passport automatically attaches user to req
        res.send(req.user);
    });
}
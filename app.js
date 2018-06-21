const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser=require('body-parser');
const keys = require('./config/keys');

const app = express();

app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, //30 Days in millisec
    keys: [keys.cookieKey]
}));


//Initialize and tell passport to use cookies (session)
app.use(passport.initialize());
app.use(passport.session());


mongoose.connect(keys.mongoURI).then(res => {
    // console.log('CONNECTED TO MLAB DEV DATABASE');
});

//Use body-parser middleware
app.use(bodyParser.json());

require('./models/User');
require('./services/passportService');
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

//Configure routing (react-express) in production mode
if(process.env.NODE_ENV==="production"){
    //Express will serve up production assets
    //like main.js, main.css files..
    app.use(express.static('client/build'));

    //Express will serve up the index.html file
    //if it doesn't recognize the route
    const path=require('path');
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,"client","build","index.html"));
    });

}
const PORT = process.env.PORT || 5000;
// console.log("SERVER LISTENING ON PORT: " + PORT);
app.listen(PORT);
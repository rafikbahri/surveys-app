const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser=require('body-parser');
const keys = require('./config/keys');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, //30 Days in millisec
    keys: [keys.cookieKey]
}));


//Initialize and tell passport to use cookies (session)
app.use(passport.initialize());
app.use(passport.session());


mongoose.connect(keys.mongoURI).then(res => {
    console.log('CONNECTED TO MLAB DEV DATABASE');
});

//Use body-parser middleware
app.use(bodyParser.json());

require('./models/User');
require('./services/passportService');
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

app.get('/', (req, res) => {
    res.send('Surveys APP');
});

console.log("SERVER LISTENING ON PORT: " + PORT);
app.listen(PORT);
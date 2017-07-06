/**
 * Created by aleksandar.mechkaros on 5/25/2017.
 */

// Load required packages
const mongoose = require('mongoose');
let express = require('express');
let cors = require('cors');
let session = require('express-session');
let flash = require('flash');

let passport = require('passport');
let bodyParser = require('body-parser');
let server = require('oauth2orize');

const app = express();
mongoose.connect("mongodb://alekoh:lol123ok321alek@ds151951.mlab.com:51951/complete-heroes");

app.set('view engine', 'jade');


app.use(passport.initialize());
app.use(cors()); // Library for cross-domain requests
app.use(session({ secret: 'SECRET', resave: true, saveUninitialized: true}));


// bodyParser allows reading the body of the requests
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// Library for showing errors in the views
app.use(flash());


// Pass the configured passport files to the server
require('./routes/routes')(app, passport);
require('./authentication_methods/passport')(passport);


app.listen(3333, function(){
    console.log('server is running');
});


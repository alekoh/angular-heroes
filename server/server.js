var mysql = require("mysql");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var passport = require("passport");
var bodyParser = require("body-parser");
var express = require("express");
var app = express();
var port = 8000;
/*
    Cross domain requests, allowing Angular to communicate with Node
*/
var allowCrossDomain = function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
    next();
};
app.use(cookieParser());
app.use(allowCrossDomain);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session({
    secret: "mySecret",
    resave: false,
    saveUninitialized: false,
})); // persistent login-component sessions
/*app.set("views", "/views");
app.set("view engine", "jade");*/
require("./config/passport")(passport);
require("./routes")(app);
app.listen(port);
console.log("we are live on port " + port);

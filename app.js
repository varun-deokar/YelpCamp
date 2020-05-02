require('dotenv').config()
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var localStrategy = require("passport-local");
var User = require("./models/user");
var Campsites = require("./models/campsite");
var Comment = require("./models/comments");
var seedDB = require("./seed");
var campsiteRoute = require("./routes/campsites");
var commentRoute = require("./routes/comments");
var authroute = require("./routes/auth");
var methodOverride = require("method-override");
var flash = require("connect-flash");
var port = process.env.PORT || 3000;
//seedDB();
// mongoose.connect("mongodb://localhost:27017/YelpCamp", { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false });
mongoose.connect(process.env.DATABASEURL, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("views/images"));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

app.use(require("express-session")({
    secret: "Hello World",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use(campsiteRoute);
app.use(commentRoute);
app.use(authroute);

app.get("/", function(req, res){
    res.render("landing");
});


app.listen(port, function(){
    console.log("Server is running");
});


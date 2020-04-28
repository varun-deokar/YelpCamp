// =============
//  AUTH ROUTES
// =============

var express = require("express");
var router = express.Router();
var User = require("../models/user");
var passport = require("passport");

router.get("/register", function(req, res){
    res.render("register");
});

router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            res.redirect("/register");
        }
        else
            passport.authenticate("local")(req, res, function(){
                req.flash("success", "Registered you successfully");
                res.redirect("/campsites");
            });
    });
});

router.get("/login", function(req, res){
    res.render("login");
});

router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campsites",
        failureRedirect: "/login"
    }), function(req, res){
        }
);

router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged out successfully");
    res.redirect("/campsites");
});

module.exports = router;
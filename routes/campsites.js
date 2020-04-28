

// ====================
//   CAMPSITE ROUTES
// ====================

var express = require("express");
var router = express.Router();
var Campsites = require("../models/campsite");
var middleware = require("../middleware/middleware");

router.get("/campsites", function(req, res){
    Campsites.find({}, function(err, allCampsites){
        if(err)
            console.log(err);
        else{
            res.render("campsites/index", {campsites: allCampsites});
        }
    });
});

router.post("/campsites", middleware.isLoggedIn, function(req, res){
    var name = req.body.name;
    var image = req.body.img;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampsite = {name: name, image: image, description: description, author: author};
    Campsites.create(newCampsite, function(err, campsite){
        if(err)
            console.log(err);
        else{
            req.flash("success", "Added new Campsite");
            res.redirect("/campsites");
        }
    });
});

router.get("/campsites/newCampsite", middleware.isLoggedIn, function(req, res){
    res.render("campsites/new");
});

router.get("/campsites/:id", function(req, res){
    Campsites.findById(req.params.id).populate("comments").exec(function(err, foundCampsite){
        if(err)
            console.log(err);
        else
            res.render("campsites/show", {campsite: foundCampsite});
    });
});

router.get("/campsites/:id/edit", middleware.postOwner, function(req, res){
    Campsites.findById(req.params.id, function(err, foundCampsite){
        if(err)
            res.redirect("back");
        else 
            res.render("campsites/edit", {campsite: foundCampsite});
    });
});

router.put("/campsites/:id", middleware.postOwner, function(req, res){
    var updatedCampsite = {name: req.body.name, image: req.body.img, description: req.body.description};
    Campsites.findByIdAndUpdate(req.params.id, updatedCampsite, function(err, updatedCamp){
        if(err)
            console.log(err);
        else{
            req.flash("success", "Campsite Updated");
            res.redirect("/campsites/" + req.params.id);
        }
    });
});

router.delete("/campsites/:id", middleware.postOwner, function(req, res){
    Campsites.findByIdAndDelete(req.params.id, function(err){
        if(err)
            console.log(err);
        else{
            req.flash("success", "Campsite Deleted")
            res.redirect("/campsites");
        }
    });
});

module.exports = router;
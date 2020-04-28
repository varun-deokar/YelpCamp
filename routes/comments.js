// ====================
//   COMMENT ROUTES
// ====================

var express = require("express");
var router = express.Router();
var Campsites = require("../models/campsite");
var Comment = require("../models/comments");
var middleware = require("../middleware/middleware");


router.get("/campsites/:id/comments/new", middleware.isLoggedIn, function(req, res){
    Campsites.findById(req.params.id, function(err, campsite){
        res.render("comments/new", {campsite: campsite});
    })
});

router.post("/campsites/:id/comments", middleware.isLoggedIn, function(req, res){
    Campsites.findById(req.params.id.substring(1,), function(err, campsite){
        if(err)
            console.log(err);
        else{
            console.log("Campsite found");
            Comment.create(req.body.comment, function(err, comment){
                if(err)
                    console.log(err);
                else{
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    campsite.comments.push(comment);
                    campsite.save();
                    res.redirect("/campsites/" + campsite._id);
                }
            });
        }
    });
});

router.get("/campsites/:campsite_id/comments/:comment_id", middleware.commentOwner, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err)
            console.log(err);
        else{
            Campsites.findById(req.params.campsite_id, function(err, foundCampsite){
                res.render("comments/edit", {campsite: foundCampsite, comment: foundComment});
            });
        }           
    });
});

router.put("/campsites/:campsite_id/comments/:comment_id", middleware.commentOwner, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, {text: req.body.comment}, function(err, updatedComment){
        if(err)
            console.log(err);
        else{
            Campsites.findById(req.params.campsite_id, function(err, foundCampsite){
                res.redirect("/campsites/" + foundCampsite._id);
            });
        }            
    });
});

router.delete("/campsites/:campsite_id/comments/:comment_id", middleware.commentOwner, function(req, res){
    Comment.findByIdAndDelete(req.params.comment_id, function(err){
        if(err)
            console.log(err);
        else
            res.redirect("/campsites/" + req.params.campsite_id);
    });
});

module.exports = router;
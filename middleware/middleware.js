var Campsites = require("../models/campsite");
var Comment = require("../models/comments");

var middleware = {};

middleware.postOwner = function(req, res, next){
                            if(req.isAuthenticated()){
                                Campsites.findById(req.params.id, function(err, foundCampsite){
                                    if(err)
                                        res.redirect("back");
                                    else if(req.user._id.equals(foundCampsite.author.id))
                                        next();
                                    else{
                                        req.flash("error", "You don't have permission to do that");
                                        res.redirect("/campsites");
                                    }
                                });
                            }
                            else{
                                req.flash("error", "You need to login first");
                                res.redirect("/login");
                            }
                        }

middleware.commentOwner = function(req, res, next){
                            if(req.isAuthenticated()){
                                Comment.findById(req.params.comment_id, function(err, foundComment){
                                    if(err)
                                        res.redirect("back");
                                    else if(req.user._id.equals(foundComment.author.id))
                                        next();
                                    else{
                                        req.flash("error", "You don't have permission to do that");
                                        res.redirect("/campsites");
                                    }
                                });
                            }
                            else{
                                req.flash("error", "You need to login first");
                                res.redirect("/login");
                            }
                        }

middleware.isLoggedIn = function(req, res, next){
                            if(req.isAuthenticated()){
                                return next();
                            }
                            req.flash("error", "You need to login first");
                            res.redirect("/login");
                        }

module.exports = middleware;
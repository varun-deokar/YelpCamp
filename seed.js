var mongoose = require("mongoose");
var Campsites = require("./models/campsite");
var Comment = require("./models/comments");

var data =[
    {
        name: "Camp1",
        image: "https://images.unsplash.com/photo-1504595403659-9088ce801e29?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        name: "Camp2",
        image: "https://images.unsplash.com/photo-1504595403659-9088ce801e29?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        name: "Camp3",
        image: "https://images.unsplash.com/photo-1504595403659-9088ce801e29?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }
]

function seedDB(){
    Campsites.deleteMany({}, function(err){
        if(err)
            console.log(err);
        else{
            console.log("Campsites Deleted");
            data.forEach(function(seed){
                Campsites.create(seed, function(err, campsite){
                    if(err)
                        console.log(err);
                    else{
                        console.log("Added a Campsite");
                        Comment.create(
                            {
                            text: "Hi",
                            author: "Me"
                            }, function(err, comment){
                                if(err)
                                    console.log(err);
                                else{
                                    campsite.comments.push(comment);
                                    campsite.save();
                                    console.log("Created new comment");
                                }
                                    
                        });
                    }                        
                });
            });
        }
    });
}
        
    //     Comment.deleteMany({}, function(err){
    //         if(err)
    //             console.log(err);
    //         else{
    //             console.log("comments deleted");
    //             data.forEach(function(campsite){
    //                 Campsites.create(campsite, function(err, newCamp){
    //                     if(err)
    //                         console.log(err);
    //                     else{
    //                         console.log("Camp Created");
    //                         Comment.create(
    //                             {
    //                                 text: "Hello",
    //                                 author: "Me"
    //                             }, function(err, comment){
    //                                         if(err){
    //                                             console.log(err)
    //                                         }
    //                                         else{
    //                                             newCamp.comments.push(comment)
    //                                             newCamp.save(function(err, data){
    //                                                 if(err)
    //                                                     console.log(err);
    //                                                 else
    //                                                     Campsites.findById(newCamp._id).populate("comments").exec(function(err, out){
    //                                                         if(err)
    //                                                             console.log(err);
    //                                                         else
    //                                                             console.log(out);
    //                                                     });
    //                                             });
    //                                         }
    //                                     });
    //                         }
    //                 });
    //             });      
                                        
    //         }
    //     });
    // });
// }
module.exports = seedDB;
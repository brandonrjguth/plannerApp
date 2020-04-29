var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/comments", { useNewUrlParser: true, useUnifiedTopology: true });


//Create Schema
var commentSchema = new mongoose.Schema({
    text: String
});

//Create Model
var Comment = mongoose.model("Comment", commentSchema);

//Add a New Comment to the DB
var newComment = new Comment({
    text: "Input Text Here"
});

newComment.save(function(err, comment) {
    if (err) {
        console.log("err")
    } else {
        console.log(comment)
    }
});

Comment.create();
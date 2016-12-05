var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
    body: String,
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    upvotes: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
}, {
    timestamps: true
});

mongoose.model('Comment', CommentSchema);

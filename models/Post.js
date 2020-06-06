const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({

    title: {
        type: String
    },
    category: {
        type: String
    },
    author: {
        type: String
    },
    body: {
        type: String
    },
    mainimage: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now()
    },
    comments: [
        {
            name: {
            type: String
        },
        email: {
            type: String
        },
        body: {
            type: String
        },
        commentdate: {
            type: String
        }
    }
    ]
});

module.exports = Post = mongoose.model('Post', PostSchema);

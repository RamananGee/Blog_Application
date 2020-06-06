var express = require('express');
var router = express.Router();
const Post = require('../models/Post');

/* GET home page. */
router.get('/', function(req, res, next) {
  Post.find()
    .then(posts => {
      res.render('index', { posts: posts })
    })
    .catch(err => console.log(err));
});

module.exports = router;

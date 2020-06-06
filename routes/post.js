var express = require('express');
var router = express.Router();
const multer = require("multer");
const upload = multer({dest: './public/images'});
const Post = require('../models/Post');
const Category = require('../models/Category');
// const Comment = require('../models/Comment');
/* GET users listing. */

router.get('/show/:id', function(req, res, next) {

  Post.findById(req.params.id)
    .then(post => {
      console.log(post);
      res.render('show',{
        'post': post
      });
    })
    .catch(err => res.status(400).json(err));
  
});

router.get('/add', function(req, res, next) {

  Category.find()
    .then(categories => {
      res.render('addpost',{
        title: 'Add Post',
        categories: categories
      });
    })
    .catch(err => res.status(400).json(err));
  
});



router.post('/addPost', upload.single('mainimage'), (req, res, next) => {
  
  const title = req.body.title;
  const category = req.body.category;
  const author = req.body.author;
  const body = req.body.body;
  const date = new Date();
  
  if(req.file) {
    console.log('Uploading File...');
    var mainimage = req.file.filename;
  } else {
    console.log('No File Uploaded...');
    var mainimage = 'noimage.jpg';
  }

  // Form Validator
  req.checkBody('title', 'Title field is required').notEmpty();
  req.checkBody('body', 'Body field is required').notEmpty();
  // Check Errors
  const errors = req.validationErrors();

  if(errors){
    res.render('addpost', { errors: errors });
  } else {
   
    const newPost = new Post({
      title,
      category,
      author,
      body,
      date,
      mainimage
    });

  newPost.save()
    .then(() => {
      req.flash('success', 'Post Added');
      res.location('/');
      res.redirect('/');
    })
    .catch(err => res.status(400).json(err));
  }
});

router.post('/addcomment', (req, res, next) => {
  
  const name = req.body.name;
  const email = req.body.email;
  const body = req.body.body;
  const postid = req.body.postid;
  const commentdate = new Date();
  console.log(name);

  // Form Validator
  req.checkBody('name', 'Name field is required').notEmpty();
  req.checkBody('email', 'Email field is required but never dispalyed').notEmpty();
  // req.checkBody('email', 'Email is inValid').isEmpty();
  req.checkBody('body', 'Body field is required').notEmpty();
  // Check Errors
  const errors = req.validationErrors();
   console.log(errors);
  if(errors){
     Post.findById(postid)
        .then(post => {
          res.render('show', { errors: errors, post: post });
        }) 
        .catch(err => res.status(400).json(err));
    
  } else {
   
    const newComment = {
      name,
      email,
      body,
      commentdate
    }

   Post.findById(postid)
      .then(post => {
        post.comments.unshift(newComment);

        //save
        post.save().then(post => {
          req.flash('success', 'Comment Added');
          res.location('/posts/show/'+postid);
          res.redirect('/posts/show/'+postid);
          console.log(post);
        })
      })
      .catch(err => res.status(400).json(err));
  
  }
});
module.exports = router;

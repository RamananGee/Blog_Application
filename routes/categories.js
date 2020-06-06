var express = require('express');
var router = express.Router();
const Post = require('../models/Post');
const Category = require('../models/Category');
/* GET users listing. */

router.get('/show/:category', function(req, res, next) {
  Post.find()
  .then(posts => {
    let newPosts = [];
    for(let post=0; post < posts.length; post++)
    {
      if(posts[post].category === req.params.category){
        newPosts.push(posts[post]);
      }
    }
    res.render('index', { title: req.params.category, posts: newPosts })
  })
  .catch(err => console.log(err));
});


router.get('/add', function(req, res, next) {
      res.render('addcategory',{
        title: 'Add Category'
      });
});


  


router.post('/add', (req, res, next) => {
  const name = req.body.name;

  // Form Validator
  req.checkBody('name', 'Name field is required').notEmpty();

   // Check Errors
   const errors = req.validationErrors();

   if(errors){
     res.render('addcategory', { errors: errors });
   } else {
  const newCategory = new Category({
    name
  });

  newCategory.save()
  .then(()=> {
    req.flash('success', 'Category Added');
    res.location('/');
    res.redirect('/posts/add');
  })
  .catch(err => res.status(400).json(err));

}
});


module.exports = router;

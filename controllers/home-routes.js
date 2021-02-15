const router = require('express').Router();
// linking connection js
const sequelize = require('../config/connection');
// linking models
const { Post, User, Comment } = require('../models');

// linking models
router.get('/', (req, res) => {
  console.log(req.sessions);
    Post.findAll({
      attributes: [
        'id',
        'post_url',
        'title',
        'created_at',
      ],
      // linking comments to post
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
    // looping through avaiable posts
      .then(dbPostData => {
        console.log(dbPostData[0]);
        //mapping all the posts
        const posts = dbPostData.map(post => post.get({ plain: true }));
        // pass a single post object into the homepage template
        res.render('homepage', { posts });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
// linking login template
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  // pushing to home page
  res.render('homepage', {
    posts,
    loggedIn: req.session.loggedIn
  });
});

//linking single post template
router.get('/post/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'post_url',
      'title',
      'created_at',
    ],
    include: [
      // linking comments with user. 
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
  // validating 
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }

      // serialize the data
      const post = dbPostData.get({ plain: true });

      // pass data to template
      res.render('single-post', {
        post,
        loggedIn: req.session.loggedIn
       });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


module.exports = router;
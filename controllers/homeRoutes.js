const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const checkAuth = require('../utils/auth');


// get all posts
router.get('/', checkAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{
        model: User,
        attributes: ['name']
      }],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

router.get('/post/:id', checkAuth, async (res, req) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes:['name']
        },
        {
          model: Comment,
          attributes:['name']
        },
      ]
    })

    if (postData) {
      const post = postData.get({plain: true});
      res.render('showpost', {post});
    }else {
      res.status(404).json({message: 'No post match this id'})
    }
  } catch (err){res.status(500).json(err)}
});

module.exports = router;
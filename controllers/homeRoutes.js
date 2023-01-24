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

module.exports = router;
const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const Auth = require('../utils/auth');


// router.get('/', async (req, res) => {
//   // TODO: Render template with Sequelize data
//   res.render('homepage');
// });
// get all posts
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      attributes: ['id', 'title', 'text', 'date_posted'],
      include: [{
        model: User,
        attributes: ['name']
      }],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('homepage', {
      posts,
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

router.get('/post/:id', Auth, async (res, req) => {
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
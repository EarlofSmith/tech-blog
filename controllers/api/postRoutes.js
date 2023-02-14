const router = require('express').Router();
const Post  = require('../../models/Post');
const Auth = require("../../utils/auth");

//render post page
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      attributes: ['id', 'title', 'text', 'date_posted'],
      include: [{
        model: User,
        attributes: ['name']
      }],
    });

    if(!postData) {
      res.status(400).json({ message: 'No post found'})
      return;
    }

    res.status(200).json(postData);
  } catch(err) {
    res.status(500).json(err);
  };
});

//create a post
router.post('/', async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

//update a post

//delete a post
// add Auth back in
router.delete('/:id', Auth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (postData) {
      res.status(200).json(postData);
    } else {
      res.status(404).json({ message: "post " + req.params.id + " was not found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
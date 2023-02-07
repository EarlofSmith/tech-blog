const router = require("express").Router();
const { User, Post } = require("../models");
const Auth = require("../utils/auth");

// get all posts for specified user
router.get('/', async (res, req) => {
    try {
        const postData = await Post.findAll({
            where: {user_id: req.session.user_id},
            attributes: ['id', 'title', 'text', 'date_posted'],
            include: [{
                model: User,
                attributes: ['name']
            }]
        });
        const posts = postData.map((post)=> post.get({plain: true}));
        res.render('dashboard', {posts, loggedIn: req.session.loggedIn});
    }catch (err) {
        res.status(500).json({message: "An error occurred, please try again."});
    }
});

// create a new post
router.post("/post", Auth, async (req, res) => {
    try {
        const postData = await Post.create({
            title: req.body.title,
            text: req.body.text,
            user_id: req.session.user_id
        });
        const post = postData.get({ plain: true });
        if (postData) {
            res.status(201).json({ id: post.id });
        } else {
            res.status(500).json({ message: "There was an error while creating the post" });
        }
    } catch (err) {
        res.status(500).json(err, {message: "An error occurred, please try again."});
    }
});

// edit a current post
router.put("/post/:id", Auth, async (req, res) => {
    try {
        const postData = await Post.update(
            {
                title: req.body.title,
                text: req.body.text,
            },
            { where: { id: req.params.id } }
        );
        if (postData) {
            res.status(201).json({ id: req.params.id });
        } else {
            res.status(500).json({ message: "There was an error while updating the post" });
        }
    } catch (err) {
        res.status(500).json(err, {message: "An error occurred, please try again."});
    }
});

// delete a post
router.delete("/post/:id",Auth, async (req, res) => {
    try {
        const postData = await Post.destroy({ where: { id: req.params.id } });
        if (postData) {
            res.status(200).json(postData);
        }else{
            res.status(404).json({ message: 'No post was found' });
        }
    } catch (err) {
        res.status(500).json(err, {message: "An error occurred, please try again."});
    }
});

// get post by id
router.get('/post/:id', Auth, async (req, res) => {
    try {
        const postData = await Post.findOne({
            where: { id: req.params.id },
            attributes: ['title', 'text']
        });
        if (postData) {
            const post = postData.get({ plain: true });
            res.render('posts', { post, newPost: false, loggedIn: req.session.loggedIn });
        } else {
            res.status(404).json({ message: 'No post found' });
        }
    } catch (err) {
        res.status(500).json(err, {message: "An error occurred, please try again."});
    }
});

module.exports = router;
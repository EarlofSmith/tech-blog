const router = require("express").Router();
const { User, Post } = require("../models");
const Auth = require("../utils/auth");

// get all posts for specified user
// get all posts for a user
router.get("/", async (req, res) => {
    try {
        const postData = await Post.findAll({
            // where: { user_id: req.session.user_id },
            attributes: ['id', 'title', 'text', 'date_posted'],
            include: [{
                model: User,
                attributes: ["name"]
            }]
        });
        const posts = postData.map((post) => post.get({ plain: true }));
        res.render("dashboard", { posts, });
        // add back loggedIn: req.session.loggedIn after posts
    } catch (err) {
        res.status(500).json({message: "An error occurred, please try again."});
    }
});

router.get("/posts", async (req, res) => {
    const post = { name: "", text: "", date_posted: '', }
    res.render("posts", { post, newPost: true });
    // add , loggedIn: req.session.loggedIn back after true
  });
// create a new post
router.post("/post",  async (req, res) => {
    try {
        const postData = await Post.create({
            title: req.body.title,
            text: req.body.text,
            date_posted: req.body.date_posted,
            // user_id: req.session.user_id
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
// !!!! add back Auth
router.put("/post/:id", async (req, res) => {
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
// !!!! add back Auth
router.delete("/post/:id", async (req, res) => {
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
// !!!! add back Auth
router.get('/post/:id',  async (req, res) => {
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
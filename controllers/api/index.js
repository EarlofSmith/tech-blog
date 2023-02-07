const router = require('express').Router();
// add correct routes to desired pages
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');

router.use('/users', userRoutes );
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);

module.exports = router;
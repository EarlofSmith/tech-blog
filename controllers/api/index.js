const router = require('express').Router();
// add correct routes to desired pages
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');

router.use('/users', userRoutes );
router.use('/posts', postRoutes);

module.exports = router;
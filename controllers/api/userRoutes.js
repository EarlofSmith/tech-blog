const router = require('express').Router();
const User = require('../../models/User');

// user login route
router.post('/login', async (req, res) => {
    try {
        const userDb = await User.findOne({
            where: {name: req.body.name,}
        });
        if (!userDb) {
            res.status(404).json({message: `A user with that name currently does not exist in the User database.
              Please use a registered name, or create and account.`});
            return;
        }
        const validPassword = await userDb.checkAuth(req.body.password);
        if (!validPassword) {
            res.status(404).json({message: 'Your password is incorrect. Please use a registered email, or create and account.'});
            return; 
        }
        req.session.save(() => {
            req.session.user_id = userDb.id;
            req.session.user_name = userDb.name;
            req.session.loggedIn = true;
            res.session = req.session;
            res.status(200).json({message: 'Login succeeded.'});
        });
    } catch(err) {
        res.status(500).json({message: "An error occurred, please try again."});
    }
});

// create new user route
router.post ('/', async (req, res) => {
    try{
        const userData = await User.create({
            name: req.body.name,
            password: req.body.password
        });
        console.log(userData)

        req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.loggedIn = true;

      res.status(200).json(userData);
    });
    }catch (err) {
        res.status(400).json({message: "An error occurred, please try again."})
    }
});

// log out
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });

module.exports = router;
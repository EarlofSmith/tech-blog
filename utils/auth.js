const checkAuth = (req, res, next) => {
    // If the user is not logged in, redirect the user to the login page. loggedIn is specified from the sesson creation
    if (!req.session.loggedIn) {
      res.redirect('/login');
    } else {
      // If the user is logged in, execute the route function
      // We call next() if the user is authenticated
      next();
    }
  };
  
  module.exports = checkAuth;